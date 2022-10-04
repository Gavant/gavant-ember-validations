import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import Component from '@glimmer/component';

import { ValidationErr } from 'validated-changeset/dist/types';

interface InputValidatorArgs<T> {
    errors?: string | string[] | ValidationErr[];
    parent: any | T;
    text?: string;
    hideErrorText?: boolean;
}

interface InputValidatorSignature<T> {
    Args: InputValidatorArgs<T>;
    Element: HTMLDivElement;
    Blocks: {
        default: [];
    };
}
export default class InputValidator<T> extends Component<InputValidatorSignature<T>> {
    labelClass = 'control-label';
    errorClass = 'invalid-feedback';
    hasFocusedOut = false;
    label = false;

    get isInvalid() {
        return this.showError;
    }

    get hasLabel() {
        return this.label;
    }

    get hasError() {
        return !!this.args.errors && this.args.errors.length !== 0;
    }

    get showError() {
        return this.hasError && (this.hasFocusedOut || this.args.parent.showAllValidationFields);
    }

    get fieldLabel() {
        return this.args.text;
    }

    get formattedErrors(): string {
        const errors = this.args.errors;
        if (Array.isArray(errors)) {
            return errors.join(', ') ?? '';
        } else {
            return errors ?? '';
        }
    }

    /**
     * Creates an instance of InputValidator.
     * @param {unknown} owner
     * @param {InputValidatorArgs<T>} args
     * @memberof InputValidator
     */
    constructor(owner: unknown, args: InputValidatorArgs<T>) {
        super(owner, args);
        assert(
            'input validators must be inside a form-validator block and invoked using the yielded <Validator.input> contextual component',
            this.args.parent.constructor.name === 'FormValidator' ||
                this.args.parent.constructor.name === 'FormValidatorChild'
        );
    }

    /**
     * On insert, set the label for attribute
     *
     * @param {HTMLElement} element
     * @memberof InputValidator
     */
    @action
    onInsert(element: HTMLElement) {
        scheduleOnce('afterRender', this, this.setLabelForAttribute, element);
    }

    /**
     * Set focused out value
     *
     * @param {boolean} value
     * @memberof InputValidator
     */
    @action
    setFocusedOut(value: boolean) {
        this.hasFocusedOut = value;
    }

    /**
     * After the changeset is updated, set the focused value
     *
     * @memberof InputValidator
     */
    @action
    changesetHasChanged() {
        scheduleOnce('afterRender', this, this.setFocusedOut, false);
    }

    /**
     * Set label for attribute
     *
     * @param {HTMLElement} element
     * @memberof InputValidator
     */
    @action
    setLabelForAttribute(element: HTMLElement) {
        const input = element.querySelector('input, select, textarea');
        const label = element.querySelector('label.input-validator-label');
        if (input && label) {
            label.setAttribute('for', input.id);
        }
    }
}
