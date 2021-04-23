import { ValidationErr } from 'validated-changeset/dist/types';

import { observes } from '@ember-decorators/object';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { bool, reads } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';

// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/input-validator';
import FormValidator from './form-validator';
import ChildFormValidator from './form-validator/child';

export default class InputValidator extends Component {
    layout = layout;
    classNames: string[] = ['form-group', 'input-validator'];
    classNameBindings: string[] = ['showError:is-invalid', 'label:has-label'];
    labelClass: string = 'control-label';
    errorClass: string = 'invalid-feedback';
    hideErrorText: boolean = false;
    hasFocusedOut: boolean = false;
    parent!: FormValidator;
    label: boolean = false;

    /**
     * A string or an array of strings which are the current error messages associated with the input field
     * In almost all cases, this will be passed via `@errors={{changeset.error.FIELD_NAME.validation}}`
     * Where "FIELD_NAME" is the associated changeset property, e.g. `changeset.error.firstName.validation`
     *
     * @type {string| string[] | ValidationErr[]}
     */
    errors?: string | string[] | ValidationErr[];

    /**
     * On initialization, verify the component was invoked in the correct context
     */
    init() {
        super.init();
        assert(
            'input validators must be inside a form-validator block and invoked using the yielded <Validator.input> contextual component',
            this.parent! instanceof FormValidator ||
                this.parent! instanceof ChildFormValidator
        );
    }

    /**
     * On element insert, update the input's associated <label>'s `for` attribute
     */
    didInsertElement() {
        super.didInsertElement();
        scheduleOnce('afterRender', this, 'setLabelForAttribute');
    }

    /**
     * Returns a comma-separated formatted string of the field's current errors
     *
     * @readonly
     * @param errors the error array in the changeset associated with the target field
     */
    @computed('errors.[]')
    get formattedErrors(): string {
        const errors = this.errors;
        if (Array.isArray(errors)) {
            return errors.join(', ') ?? '';
        } else {
            return errors ?? '';
        }
    }

    /**
     * Returns true if the target changeset field has at least one error
     *
     * @readonly
     * @param errors.length the count of the current errors for the target field
     */
    @bool('errors.length') hasError: boolean | undefined;

    /**
     * Checks to see if we should show the error
     * If there is an error and you have focused out of the field or your supposed to show all errors then this value is true
     *
     * @readonly
     * @param hasError If there is an error for this field
     * @param hasFocusedOut If the user has focused out of the field
     * @param showAllValidationFields If we should be showing all validation fields
     */
    @computed('hasError', 'hasFocusedOut', 'showAllValidationFields')
    get showError() {
        return (
            this.hasError &&
            (this.hasFocusedOut || this.showAllValidationFields)
        );
    }

    /**
     * The label for the field
     *
     * @readonly
     * @param text `text` that is passed in from the user
     */
    @reads('text') fieldLabel: string | undefined;

    /**
     * Checks to see if we should be showing all validation fields. This is changed via the `FormValidator.showAllValidationFields` property
     *
     * @readonly
     * @param parent.showAllValidationFields `text` that is passed in from the user
     */
    @reads('parent.showAllValidationFields') showAllValidationFields:
        | boolean
        | undefined;

    /**
     * Afer the changeset has changed, this observer resets `hasFocusedOut`
     */
    @observes('parent.changeset')
    changesetHasChanged() {
        scheduleOnce('afterRender', this, 'set', 'hasFocusedOut', false);
    }

    /**
     * When user focuses out of the field, this sets `hasFocusedOut` to `true`
     */
    focusOut() {
        this.set('hasFocusedOut', true);
    }

    /**
     * Updates the input's associated <label> with a for="" attribute value
     * using the auto-generated ID of the input
     */
    setLabelForAttribute() {
        const input = this.element.querySelector('input, select, textarea');
        const label = this.element.querySelector('label.input-validator-label');
        if (input && label) {
            label.setAttribute('for', input.id);
        }
    }
}
