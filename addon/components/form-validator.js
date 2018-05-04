import Component from '@ember/component';
import layout from '../templates/components/form-validator';
import { get, set } from '@ember/object';
import { isNone, tryInvoke } from '@ember/utils';
import { A } from '@ember/array';
import { resolve, reject, all } from 'rsvp';

export default Component.extend({
    layout,
    tagName: 'form',
    didInvokeValidate: false,

    init() {
        this._super(...arguments);
        set(this, 'childValidators', A());
    },

    registerChild(formValidator) {
        get(this, 'childValidators').pushObject(formValidator);
    },

    deregisterChild(formValidator) {
        get(this, 'childValidators').removeObject(formValidator);
    },

    validateChangeset(changeset) {
        if(isNone(changeset)) {
            return resolve();
        }

        return changeset.validate().then(() => {
            if(get(changeset, 'isInvalid')) {
                return reject();
            } else {
                return resolve();
            }
        });
    },

    async submitForm() {
        const ownChangeset = get(this, 'changeset');
        const validations = A([this.validateChangeset(ownChangeset)]);
        const childChangesets = get(this, 'childValidators').mapBy('changeset');
        childChangesets.forEach(changeset => validations.pushObject(this.validateChangeset(changeset)));
        set(this, 'showAllValidationFields', false);
        get(this, 'childValidators').setEach('showAllValidationFields', false);

        try {
            await all(validations);
            return tryInvoke(this, 'submit', [ownChangeset, childChangesets]);
        } catch(error) {
            set(this, 'showAllValidationFields', true);
            get(this, 'childValidators').setEach('showAllValidationFields', true);
            return reject();
        }
    },

    actions: {
        submitForm() {
            return this.submitForm();
        }
    }
});
