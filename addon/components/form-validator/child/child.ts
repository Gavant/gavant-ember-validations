import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { BufferedChangeset } from 'ember-changeset/types';

import FormValidator from '../form-validator';

interface FormValidatorChildArgs {
    parent: FormValidator;
    changeset: BufferedChangeset;
}

export default class FormValidatorChild extends Component<FormValidatorChildArgs> {
    @tracked showAllValidationFields: boolean = false;

    constructor(owner: unknown, args: FormValidatorChildArgs) {
        super(owner, args);
        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            this.args.parent.constructor.name === 'FormValidator'
        );

        this.args.parent.registerChild(this);
    }

    /**
     * Deregisters a `FormValidatorChild` with the parent `FormValidator`
     */
    willDestroy() {
        super.willDestroy();
        this.args.parent.deregisterChild(this);
    }
}
