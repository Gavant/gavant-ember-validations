import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { BufferedChangeset } from 'ember-changeset/types';

import FormValidatorChild from '@gavant/ember-validations/components/form-validator/child/child';
import { GenericChangeset } from '@gavant/ember-validations/utilities/create-changeset';

import { all, reject, resolve } from 'rsvp';

interface FormValidatorArgs<T> {
    changeset: GenericChangeset<T>;
    submit: (changesets: [GenericChangeset<T>, GenericChangeset<T>[]]) => void;
}

export default class FormValidator<T> extends Component<FormValidatorArgs<T>> {
    @tracked childValidators: FormValidatorChild<T>[] = [];
    @tracked didInvokeValidate: boolean = false;
    @tracked showAllValidationFields: boolean = false;

    /**
     * Register a new child
     *
     * @param {FormValidatorChild<T>} child
     * @memberof FormValidator
     */
    registerChild(child: FormValidatorChild<T>) {
        this.childValidators.push(child);
    }

    /**
     * Deregister child
     *
     * @param {FormValidatorChild<T>} child
     * @memberof FormValidator
     */
    deregisterChild(child: FormValidatorChild<T>) {
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
                changesets: GenericChangeset<T>[];
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
