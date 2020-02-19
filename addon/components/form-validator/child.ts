import Component from '@ember/component';
import { assert } from '@ember/debug';

// @ts-ignore: Ignore import of compiled template
import layout from '../../templates/components/form-validator/child';
import FormValidator from '../form-validator';

export default class FormValidatorChild extends Component {
    tagName = 'div';
    layout = layout;
    parent!: FormValidator;

    /**
     * Registers a `FormValidatorChild` with the parent `FormValidator`
     */
    init() {
        super.init();
        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            this.parent instanceof FormValidator
        );

        this.parent.registerChild(this);
    }

    /**
     * Deregisters a `FormValidatorChild` with the parent `FormValidator`
     */
    willDestroyElement() {
        super.willDestroyElement();
        this.parent.deregisterChild(this);
    }
};
