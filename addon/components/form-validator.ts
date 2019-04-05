import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/form-validator';
import { tagName } from '@ember-decorators/component';
import { A } from '@ember/array';
import NativeArray from '@ember/array/-private/native-array';
import { isNone, tryInvoke } from '@ember/utils';
import { resolve, reject, all } from 'rsvp';
import { action } from '@ember-decorators/object';

@tagName('form')
export default class FormValidator extends Component{
    layout = layout;
    didInvokeValidate: boolean = false;
    childValidators: NativeArray<{}> = A();
    changeset: any;
    showAllValidationFields: boolean = false;

    registerChild(formValidator: any) {
        this.childValidators.pushObject(formValidator);
    }

    deregisterChild(formValidator: any) {
        this.childValidators.removeObject(formValidator);
    }

    validateChangeset(changeset: any) {
        if(isNone(changeset)) {
            return resolve();
        }

        return changeset.validate().then(() => {
            if(changeset.isInvalid) {
                return reject();
            } else {
                return resolve();
            }
        });
    }

    @action
    async submitForm() {
        const ownChangeset = this.changeset;
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
    }
};
