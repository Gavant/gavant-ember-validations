import NativeArray from '@ember/array/-private/native-array';
import Component from '@ember/component';
import { BufferedChangeset } from 'ember-changeset/types';
import FormValidatorChild from './form-validator/child';
export default class FormValidator extends Component {
    tagName: string;
    layout: any;
    didInvokeValidate: boolean;
    childValidators: NativeArray<{}>;
    changeset: BufferedChangeset | null;
    showAllValidationFields: boolean;
    /**
     * Registers a `FormValidatorChild` via adding to the `childValidators` array
     *
     * @param child The form validator child to register
     */
    registerChild(child: FormValidatorChild): void;
    /**
     * Deregisters a `FormValidatorChild` via removing it from the `childValidators` array
     *
     * @param child The form validator child to deregister
     */
    deregisterChild(child: FormValidatorChild): void;
    /**
     * Validate the changeset. Resolve promise if successful, reject if not
     *
     * @param changeset The changeset to validate
     */
    validateChangeset(changeset: BufferedChangeset): Promise<unknown>;
    /**
     * Submit the form. Check parent changeset and all child changesets to see if they validate
     * If they do validate, try to invoke `submit`. Otherwise show all validation field errors
     */
    submitForm(event: Event): Promise<undefined>;
}
