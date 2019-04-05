import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../../templates/components/form-validator/child';
import { tagName } from '@ember-decorators/component';
import { assert } from '@ember/debug';

@tagName('div')
export default class FormValidatorChild extends Component {
    layout = layout;
    parent: any;

    constructor() {
        super();
        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            this.parent.registerChild
        );

        this.parent.registerChild(this);
    }

    willDestroyElement() {
        super.willDestroyElement();
        this.parent.deregisterChild(this);
    }
};
