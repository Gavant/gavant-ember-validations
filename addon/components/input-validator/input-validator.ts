import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import Component from '@glimmer/component';

import FormValidatorChild from '@gavant/ember-validations/components/form-validator/child/child';
import FormValidator from '@gavant/ember-validations/components/form-validator/form-validator';

import { ValidationErr } from 'validated-changeset/dist/types';

interface InputValidatorArgs {
    errors?: string | string[] | ValidationErr[];
    parent: FormValidator | FormValidatorChild;
    text?: string;
    hideErrorText?: boolean;
}

export default class InputValidator extends Component<InputValidatorArgs> {
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

    constructor(owner: unknown, args: InputValidatorArgs) {
        super(owner, args);
        assert(
            'input validators must be inside a form-validator block and invoked using the yielded <Validator.input> contextual component',
            this.args.parent.constructor.name === 'FormValidator' ||
                this.args.parent.constructor.name === 'FormValidatorChild'
        );
    }

    @action
    onInsert(element: HTMLElement) {
        scheduleOnce('afterRender', this, this.setLabelForAttribute, element);
    }

    @action
    setFocusedOut(value: boolean) {
        this.hasFocusedOut = value;
    }

    @action
    changesetHasChanged() {
        scheduleOnce('afterRender', this, this.setFocusedOut, false);
    }

    @action
    setLabelForAttribute(element: HTMLElement) {
        const input = element.querySelector('input, select, textarea');
        const label = element.querySelector('label.input-validator-label');
        if (input && label) {
            label.setAttribute('for', input.id);
        }
    }
}
