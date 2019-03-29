import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import createChangeset from '../utilities/create-changeset';
import { get, set } from '@ember/object';

export default Mixin.create({
    setupController(controller, model) {
        this._super(...arguments);
        const validations = get(this, 'validations');
        const cloneAttrs = get(this, 'cloneAttrs');
        assert('You must provide a validations object on the "validations" property!', !isNone(validations));
        set(controller, 'changeset', this.createChangesetInstance(model, validations, cloneAttrs));
    },

    createChangesetInstance() {
        return createChangeset(...arguments);
    }
});
