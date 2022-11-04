import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { WithBoundArgs } from '@glint/template';

import FormValidator, { ValueForChangeset } from '../';
import { GenericChangeset } from '../../../utilities/create-changeset';
import InputValidator from '../../input-validator';

interface FormValidatorChildArgs<C extends GenericChangeset<V>, V = ValueForChangeset<C>> {
    /**
     * So this is actually not optional. But due to a limitation with `withBoundArgs` it doesnt pass the correct type information down.
     * This is a workaround to allow us to not use withBoundArgs but still get the right type information. For all cases I can think of this will be
     * passed automatically by the parent component and we wont have to worry about it.
     *
     * @type {FormValidator<GenericChangeset<unknown>, unknown>}
     * @memberof FormValidatorChildArgs
     */
    parent?: FormValidator<GenericChangeset<unknown>, unknown>;
    changeset: C;
}

interface FormValidatorChildSignature<C extends GenericChangeset<V>, V = ValueForChangeset<C>> {
    Args: FormValidatorChildArgs<C, V>;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            C,
            {
                input: WithBoundArgs<typeof InputValidator<C>, 'parent'>;
            }
        ];
    };
}

export default class FormValidatorChild<C extends GenericChangeset<V>, V = ValueForChangeset<C>> extends Component<
    FormValidatorChildSignature<C, V>
> {
    @tracked showAllValidationFields: boolean = false;

    /**
     * Creates an instance of FormValidatorChild.
     * @param {unknown} owner
     * @param {FormValidatorChildArgs<T>} args
     * @memberof FormValidatorChild
     */
    constructor(owner: unknown, args: FormValidatorChildArgs<C, V>) {
        super(owner, args);
        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            this.args.parent?.constructor.name === 'FormValidator'
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
        this.args.parent?.deregisterChild(this as any);
    }
}
