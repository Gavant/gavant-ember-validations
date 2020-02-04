import { A } from '@ember/array';
import NativeArray from '@ember/array/-private/native-array';
import Component from '@ember/component';
import { action } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { ChangesetDef } from 'ember-changeset/types';
import { all, reject, resolve } from 'rsvp';

// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/form-validator';
import FormValidatorChild from './form-validator/child';

export interface Changeset extends ChangesetDef {
    validate: (key?: any) => any;
}

export default class FormValidator extends Component {
    tagName = 'form';
    layout = layout;
    didInvokeValidate: boolean = false;
    childValidators: NativeArray<{}> = A();
    changeset: Changeset | null = null;
    showAllValidationFields: boolean = false;

    /**
     * Registers a `FormValidatorChild` via adding to the `childValidators` array
     *
     * @param child The form validator child to register
     */
    registerChild(child: FormValidatorChild) {
        this.childValidators.pushObject(child);
    }

    /**
     * Deregisters a `FormValidatorChild` via removing it from the `childValidators` array
     *
     * @param child The form validator child to deregister
     */
    deregisterChild(child: FormValidatorChild) {
        this.childValidators.removeObject(child);
    }

    /**
     * Validate the changeset. Resolve promise if successful, reject if not
     *
     * @param changeset The changeset to validate
     */
    validateChangeset(changeset: Changeset) {
        return changeset.validate().then(() => {
            if(changeset.isInvalid) {
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
        const ownChangeset = this.changeset;
        if (ownChangeset) {
            const validations = A([this.validateChangeset(ownChangeset)]);
            const childChangesets = this.childValidators.mapBy('changeset');
            childChangesets.forEach(changeset => validations.pushObject(this.validateChangeset(changeset)));
            this.set('showAllValidationFields', false);
            this.childValidators.setEach('showAllValidationFields', false);

            try {
                await all(validations);
                return tryInvoke(this, 'submit', [ownChangeset, childChangesets]);
            } catch(error) {
                this.set('showAllValidationFields', true);
                this.childValidators.setEach('showAllValidationFields', true);
                return reject();
            }
        } else {
            return reject();
        }
    }
};
