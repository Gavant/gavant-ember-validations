import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import FormValidator, { BoundInputValidator } from '../';
import { GenericChangeset } from '../../../utilities/create-changeset';

interface FormValidatorChildArgs<P, C extends GenericChangeset<unknown>> {
    parent: FormValidator<P, [typeof FormValidatorChild]>;
    changeset: C;
}

interface ChildFormValidatorYield<C> {
    input: BoundInputValidator<C>;
}

interface FormValidatorChildSignature<P, C extends GenericChangeset<unknown>> {
    Args: FormValidatorChildArgs<P, C>;
    Element: HTMLDivElement;
    Blocks: {
        default: [FormValidatorChildArgs<P, C>['changeset'], ChildFormValidatorYield<C>];
    };
}

export default class FormValidatorChild<P, C extends GenericChangeset<unknown>> extends Component<
    FormValidatorChildSignature<P, C>
> {
    @tracked showAllValidationFields: boolean = false;

    /**
     * Creates an instance of FormValidatorChild.
     * @param {unknown} owner
     * @param {FormValidatorChildArgs<T>} args
     * @memberof FormValidatorChild
     */
    constructor(owner: unknown, args: FormValidatorChildArgs<P, C>) {
        super(owner, args);
        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            this.args.parent.constructor.name === 'FormValidator'
        );

        this.args.parent.registerChild(this as any);
    }

    /**
     * Deregister the child from the parent
     *
     * @memberof FormValidatorChild
     */
    willDestroy() {
        super.willDestroy();
        this.args.parent.deregisterChild(this as any);
    }
}
