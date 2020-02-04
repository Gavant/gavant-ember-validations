import Component from '@ember/component';
import { defineProperty, computed } from '@ember/object';
import { bool, reads } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import { observes } from '@ember-decorators/object';

// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/input-validator';
import FormValidatorChild from './form-validator/child';
import FormValidator from './form-validator';

export default class InputValidator extends Component {
    layout = layout;
    classNames: string[] = [ 'form-group', 'input-validator' ];
    classNameBindings: string[] = ['showError:is-invalid', 'label:has-label'];
    labelClass: string = 'control-label';
    errorClass: string = 'invalid-feedback';
    label: boolean = false;
    hideErrorText: boolean = false;
    hasFocusedOut: boolean = false;
    error = null;
    parentView: any;
    target: any;

    /**
     * Checks to see if we should show the error
     * If there is an error and you have focused out of the field or your supposed to show all errors then this value is true
     *
     * @param hasError If there is an error for this field
     * @param hasFocusedOut If the user has focused out of the field
     * @param showAllValidationFields If we should be showing all validation fields
     */
    @computed('hasError', 'hasFocusedOut', 'showAllValidationFields')
    get showError() {
        return this.hasError && (this.hasFocusedOut || this.showAllValidationFields);
    }

    /**
     * Checks to see if there is an error related to the field
     *
     * @param error.length Error array length
     */
    @bool('error.length') hasError: boolean | undefined;

    /**
     * The label for the field
     *
     * @param text `text` that is passed in from the user
     */
    @reads('text') fieldLabel: string | undefined;

    /**
     * Checks to see if we should be showing all validation fields. This is changed via the `FormValidator.showAllValidationFields` property
     *
     * @param targetView.showAllValidationFields `text` that is passed in from the user
     */
    @reads('targetView.showAllValidationFields') showAllValidationFields: boolean | undefined;

    /**
     * Afer the changeset has changed, this observer resets `hasFocusedOut`
     */
    @observes('targetView.changeset')
    changesetHasChanged() {
        scheduleOnce('afterRender', this, 'set', 'hasFocusedOut', false);
    }

    /**
     * Goes up through the parent components to find an instance of a `FormValidator` or `FormValidatorChild`
     *
     * @param targetView.showAllValidationFields `text` that is passed in from the user
     */
    get targetView() {
        return this.getFormComponent(this.parentView);
    }

    private getFormComponent(parentView: any): any {
        if (!parentView) {
            return null;
        }
        if (parentView instanceof FormValidator || parentView instanceof FormValidatorChild) {
            return parentView;
        }
        return this.getFormComponent(parentView.parentView);
    }

    /**
     * When user focuses out of the field, this sets `hasFocusedOut` to `true`
     */
    focusOut() {
        return this.set('hasFocusedOut', true);
    }

    /**
     * Defines a new property called error, which reads the errors from the changeset for the specific value.
     * For example, if you pass in a target of `name` error is set to `targetView.changeset.error.name.validation` which gives us the errors that we display to the user
     */
    defineErrorProperty() {
        const input = this.element.querySelector('input, select, textarea');
        const label = this.element.querySelector('label.input-validator-label');
        if(input && label) {
            label.setAttribute('for', input.id);
        }

        defineProperty(this, 'error', reads(`targetView.changeset.error.${this.target}.validation`));
    }

    didInsertElement() {
        super.didInsertElement();
        scheduleOnce('afterRender', this, 'defineErrorProperty');
    }
};
