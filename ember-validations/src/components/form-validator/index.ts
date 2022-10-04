import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { BufferedChangeset } from 'ember-changeset/types';

import InputValidator from 'components/input-validator';
import { all, reject, resolve } from 'rsvp';

import { WithBoundArgs } from '@glint/template';

import { GenericChangeset } from '../../utilities/create-changeset';
import FormValidatorChild from './child';

interface FormValidatorArgs<P> {
    changeset: GenericChangeset<P>;
    submit: (changesets: [GenericChangeset<P>, GenericChangeset<any>[]]) => void;
}

export type BoundInputValidator<T> = WithBoundArgs<typeof InputValidator<T>, 'parent'>;
type BoundChildValidator<P> = WithBoundArgs<typeof FormValidatorChild<P, any>, 'parent'>;

interface FormValidatorYield<P> {
    submit: FormValidator<P, any>['submitForm'];
    input: BoundInputValidator<P>;
    child: BoundChildValidator<P>;
}

interface FormValidatorSignature<P> {
    Args: FormValidatorArgs<P>;
    Element: HTMLFormElement;
    Blocks: {
        default: [GenericChangeset<P>, FormValidatorYield<P>];
    };
}

export default class FormValidator<P, C extends any[]> extends Component<FormValidatorSignature<P>> {
    @tracked childValidators: FormValidatorChild<P, C[number]>[] = [];
    @tracked didInvokeValidate: boolean = false;
    @tracked showAllValidationFields: boolean = false;

    /**
     * Register a new child
     *
     * @param {FormValidatorChild<T>} child
     * @memberof FormValidator
     */
    registerChild(child: FormValidatorChild<P, C[number]>) {
        this.childValidators.push(child);
    }

    /**
     * Deregister child
     *
     * @param {FormValidatorChild<T>} child
     * @memberof FormValidator
     */
    deregisterChild(child: FormValidatorChild<P, C[number]>) {
        this.childValidators = this.childValidators.filter((item) => item !== child);
    }

    /**
     * Validate a changeset
     *
     * @param {BufferedChangeset} changeset
     * @return {*}
     * @memberof FormValidator
     */
    validateChangeset(changeset: BufferedChangeset) {
        return changeset.validate().then(() => {
            if (changeset.isInvalid) {
                return reject();
            } else {
                return resolve();
            }
        });
    }

    /**
     * Submit the form. Check parent changeset and all child changesets to see if they validate
     * If they do validate, try to invoke `submit`. Otherwise show all validation field errors
     *
     * @param {Event} event
     * @return {*}
     * @memberof FormValidator
     */
    @action
    async submitForm(event: Event) {
        event.preventDefault();
        const ownChangeset = this.args.changeset;
        if (ownChangeset) {
            const validations = [this.validateChangeset(ownChangeset)];
            const children = this.childValidators.reduce<{
                changesets: GenericChangeset<C[number]>[];
                validations: Promise<unknown>[];
            }>(
                (prev, child) => {
                    prev.changesets.push(child.args.changeset);
                    prev.validations.push(this.validateChangeset(child.args.changeset));
                    return prev;
                },
                { changesets: [], validations: [] }
            );

            validations.push(...children.validations);

            this.showAllValidationFields = false;
            this.childValidators.forEach((item) => {
                item.showAllValidationFields = false;
            });

            try {
                await all(validations);
                return this.args?.submit([ownChangeset, children.changesets]);
            } catch (error) {
                this.showAllValidationFields = true;
                this.childValidators.forEach((item) => {
                    item.showAllValidationFields = true;
                });
                return reject();
            }
        } else {
            return reject();
        }
    }
}
