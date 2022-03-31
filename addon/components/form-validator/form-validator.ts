import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { BufferedChangeset } from 'ember-changeset/types';

import FormValidatorChild from '@gavant/ember-validations/components/form-validator/child/child';

import { all, reject, resolve } from 'rsvp';

interface FormValidatorArgs {
    changeset: BufferedChangeset;
    submit: (changesets: [BufferedChangeset, BufferedChangeset[]]) => void;
}

export default class FormValidator extends Component<FormValidatorArgs> {
    @tracked childValidators: FormValidatorChild[] = [];
    @tracked didInvokeValidate: boolean = false;
    @tracked showAllValidationFields: boolean = false;

    /**
     * Registers a `FormValidatorChild` via adding to the `childValidators` array
     *
     * @param child The form validator child to register
     */
    registerChild(child: FormValidatorChild) {
        this.childValidators.push(child);
    }

    /**
     * Deregisters a `FormValidatorChild` via removing it from the `childValidators` array
     *
     * @param child The form validator child to deregister
     */
    deregisterChild(child: FormValidatorChild) {
        this.childValidators = this.childValidators.filter((item) => item !== child);
    }

    /**
     * Validate the changeset. Resolve promise if successful, reject if not
     *
     * @param changeset The changeset to validate
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
     */
    @action
    async submitForm(event: Event) {
        event.preventDefault();
        const ownChangeset = this.args.changeset;
        if (ownChangeset) {
            const validations = [this.validateChangeset(ownChangeset)];
            const children = this.childValidators.reduce<{
                changesets: BufferedChangeset[];
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
