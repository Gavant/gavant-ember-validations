import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../../templates/components/form-validator/child';
import { tagName } from '@ember-decorators/component';
import { assert } from '@ember/debug';
import FormValidator from '../form-validator';

@tagName('div')
export default class FormValidatorChild extends Component {
    layout = layout;
    parent!: FormValidator;

    /**
     * Registers a `FormValidatorChild` with the parent `FormValidator`
     */
    constructor() {
        super();
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
