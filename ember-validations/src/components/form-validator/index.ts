import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { BufferedChangeset } from 'ember-changeset/types';

import { all, reject, resolve } from 'rsvp';

import { WithBoundArgs } from '@glint/template';

import { GenericChangeset } from '../../utilities/create-changeset';
import InputValidator from '../input-validator';
import FormValidatorChild from './child';

interface FormValidatorArgs<C extends GenericChangeset<V>, V = ValueForChangeset<C>> {
    changeset: C;
    submit: (changesets: [C, GenericChangeset<any>[]] | [C]) => void;
}

export type BoundInputValidator<C extends GenericChangeset<V>, V = ValueForChangeset<C>> = WithBoundArgs<
    typeof InputValidator<C>,
    'parent'
>;

interface FormValidatorSignature<C extends GenericChangeset<V>, V = ValueForChangeset<C>> {
    Args: FormValidatorArgs<C, V>;
    Element: HTMLFormElement;
    Blocks: {
        default: [
            C,
            {
                submit: FormValidator<C, V>['submitForm'];
                input: WithBoundArgs<typeof InputValidator<C>, 'parent'>;
                child: typeof FormValidatorChild;
            }
        ];
    };
}

export type ValueForChangeset<V> = V extends GenericChangeset<infer T> ? T : never;

export default class FormValidator<C extends GenericChangeset<V>, V = ValueForChangeset<C>> extends Component<
    FormValidatorSignature<C, V>
> {
    @tracked childValidators: FormValidatorChild<C, V>[] = [];
    @tracked didInvokeValidate: boolean = false;
    @tracked showAllValidationFields: boolean = false;

    /**
     * Register a new child
     *
     * @param {FormValidatorChild<T>} child
     * @memberof FormValidator
     */
    registerChild(child: FormValidatorChild<C, V>) {
        this.childValidators.push(child);
    }

    /**
     * Deregister child
     *
     * @param {FormValidatorChild<T>} child
     * @memberof FormValidator
     */
    deregisterChild(child: FormValidatorChild<C, V>) {
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
                changesets: GenericChangeset<unknown>[];
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
