import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/input-validator';
import { computed } from '@ember-decorators/object';
import { bool, reads } from '@ember-decorators/object/computed';
import { observes } from '@ember-decorators/object';
import { scheduleOnce } from '@ember/runloop';
import FormValidator from './form-validator';
import FormValidatorChild from './form-validator/child';
import { defineProperty } from '@ember/object';

export default class InputValidator extends Component {
    layout = layout;
    classNames: string[] = [ 'form-group', 'input-validator' ];
    classNameBindings: string[] = ['showError:is-invalid', 'label:has-label'];
    labelClass: string = 'control-label';
    errorClass: string = 'invalid-feedback';
    label: boolean = false;
    hideErrorText: boolean = false;
    hasFocusedOut: boolean = false;
    error = null;
    parentView: any;
    target: any;

    @computed('hasError', 'hasFocusedOut', 'showAllValidationFields')
    get showError() {
        return this.hasError && (this.hasFocusedOut || this.showAllValidationFields);
    }

    @bool('error.length') hasError: boolean | undefined;
    @reads('text') fieldLabel: string | undefined;
    @reads('targetView.showAllValidationFields') showAllValidationFields: boolean | undefined;

    get targetView() {
        return this.getFormComponent(this.parentView);
    }

    @observes('targetView.changeset')
    changesetHasChanged() {
        scheduleOnce('afterRender', this, 'set', 'hasFocusedOut', false);
    }

    getFormComponent(parentView: any): any {
        if (!parentView) {
            return null;
        }
        if (parentView instanceof FormValidator || parentView instanceof FormValidatorChild) {
            return parentView;
        }
        return this.getFormComponent(parentView.parentView);
    }

    focusOut() {
        return this.set('hasFocusedOut', true);
    }

    defineErrorProperty() {
        const input = this.element.querySelector('input, select, textarea');
        const label = this.element.querySelector('label.input-validator-label');
        if(input && label) {
            label.setAttribute('for', input.id);
        }

        defineProperty(this, 'error', reads(`targetView.changeset.error.${this.target}.validation`));
    }

    didInsertElement() {
        super.didInsertElement();
        scheduleOnce('afterRender', this, 'defineErrorProperty');
    }
};
