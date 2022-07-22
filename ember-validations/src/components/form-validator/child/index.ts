import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import FormValidator from '../';
import { GenericChangeset } from '../../../utilities/create-changeset';

interface FormValidatorChildArgs<T> {
    parent: FormValidator<T>;
    changeset: GenericChangeset<T>;
}

export default class FormValidatorChild<T> extends Component<FormValidatorChildArgs<T>> {
    @tracked showAllValidationFields: boolean = false;

    /**
     * Creates an instance of FormValidatorChild.
     * @param {unknown} owner
     * @param {FormValidatorChildArgs<T>} args
     * @memberof FormValidatorChild
     */
    constructor(owner: unknown, args: FormValidatorChildArgs<T>) {
        super(owner, args);
        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            this.args.parent.constructor.name === 'FormValidator'
        );

        this.args.parent.registerChild(this);
    }

    /**
     * Deregister the child from the parent
     *
     * @memberof FormValidatorChild
     */
    willDestroy() {
        super.willDestroy();
        this.args.parent.deregisterChild(this);
    }
}
