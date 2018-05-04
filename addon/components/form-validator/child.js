import layout from '../../templates/components/form-validator/child';
import FormValidator from '../form-validator';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

export default FormValidator.extend({
    layout,
    tagName: 'div',

    init() {
        this._super(...arguments);

        assert(
            'child form validators must be inside a form-validator block and pass it to this component in the "parent" attribute',
            get(this, 'parent.registerChild')
        );

        get(this, 'parent').registerChild(this);
    },

    willDestroyElement() {
        this._super(...arguments);
        get(this, 'parent').deregisterChild(this);
    }
});
