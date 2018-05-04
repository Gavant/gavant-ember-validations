import Component from '@ember/component';
import layout from '../templates/components/input-validator';
import { get, set, computed, defineProperty, observer } from '@ember/object';
import { bool, reads } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import FormValidator from './form-validator';
import FormValidatorChild from './form-validator/child';


export default Component.extend({
    layout,
    classNames: [ 'form-group', 'input-validator' ],
    classNameBindings: ['showError:has-warning', 'label:has-label'],
    labelClass: 'control-label',
    label: false,
    hideErrorText: false,
    hasFocusedOut: false,
    error: null,
    showError: computed('hasError', 'hasFocusedOut', 'showAllValidationFields', function(){
        return get(this, 'hasError') && (get(this, 'hasFocusedOut') || get(this, 'showAllValidationFields'));
    }),
    hasError: bool('error'),
    fieldLabel: reads('text'),
    showAllValidationFields: reads('targetView.showAllValidationFields'),

    targetView: computed(function() {
        return this.getFormComponent(get(this, 'parentView'));
    }).volatile(),

    changesetHasChanged: observer('targetView.changeset', function() {
        scheduleOnce('afterRender', this, 'set', 'hasFocusedOut', false);
    }),

    getFormComponent(parentView) {
        if (!parentView) {
            return null;
        }
        if (parentView instanceof FormValidator || parentView instanceof FormValidatorChild) {
            return parentView;
        }
        return this.getFormComponent(get(parentView, 'parentView'));
    },

    focusOut() {
        this._super(...arguments);
        return set(this, 'hasFocusedOut', true);
    },

    didRender() {
        this._super(...arguments);
        const id = this.$('input, select, textarea').first().attr('id');
        this.$('label.input-validator-label').attr('for', id);
        defineProperty(this, 'error', reads(`targetView.changeset.error.${get(this, 'target')}.validation`));
    }
});
