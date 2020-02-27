import Component from '@ember/component';
import FormValidator from '../form-validator';
export default class FormValidatorChild extends Component {
    tagName: string;
    layout: any;
    parent: FormValidator;
    /**
     * Registers a `FormValidatorChild` with the parent `FormValidator`
     */
    init(): void;
    /**
     * Deregisters a `FormValidatorChild` with the parent `FormValidator`
     */
    willDestroyElement(): void;
}
