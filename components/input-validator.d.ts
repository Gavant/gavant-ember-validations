import Component from '@ember/component';
import FormValidator from './form-validator';
export default class InputValidator extends Component {
    layout: any;
    classNames: string[];
    classNameBindings: string[];
    labelClass: string;
    errorClass: string;
    hideErrorText: boolean;
    hasFocusedOut: boolean;
    parent: FormValidator;
    label: boolean;
    /**
     * An array of strings which are the current error messages associated with the input field
     * In almost all cases, this will be passed via `@errors={{changeset.error.FIELD_NAME.validation}}`
     * Where "FIELD_NAME" is the associated changeset property, e.g. `changeset.error.firstName.validation`
     *
     * @type {string[]}
     */
    errors?: string[];
    /**
     * On initialization, verify the component was invoked in the correct context
     */
    init(): void;
    /**
     * On element insert, update the input's associated <label>'s `for` attribute
     */
    didInsertElement(): void;
    /**
     * Returns a comma-separated formatted string of the field's current errors
     *
     * @readonly
     * @param errors the error array in the changeset associated with the target field
     */
    get formattedErrors(): string;
    /**
     * Returns true if the target changeset field has at least one error
     *
     * @readonly
     * @param errors.length the count of the current errors for the target field
     */
    hasError: boolean | undefined;
    /**
     * Checks to see if we should show the error
     * If there is an error and you have focused out of the field or your supposed to show all errors then this value is true
     *
     * @readonly
     * @param hasError If there is an error for this field
     * @param hasFocusedOut If the user has focused out of the field
     * @param showAllValidationFields If we should be showing all validation fields
     */
    get showError(): boolean | undefined;
    /**
     * The label for the field
     *
     * @readonly
     * @param text `text` that is passed in from the user
     */
    fieldLabel: string | undefined;
    /**
     * Checks to see if we should be showing all validation fields. This is changed via the `FormValidator.showAllValidationFields` property
     *
     * @readonly
     * @param parent.showAllValidationFields `text` that is passed in from the user
     */
    showAllValidationFields: boolean | undefined;
    /**
     * Afer the changeset has changed, this observer resets `hasFocusedOut`
     */
    changesetHasChanged(): void;
    /**
     * When user focuses out of the field, this sets `hasFocusedOut` to `true`
     */
    focusOut(): void;
    /**
     * Updates the input's associated <label> with a for="" attribute value
     * using the auto-generated ID of the input
     */
    setLabelForAttribute(): void;
}
