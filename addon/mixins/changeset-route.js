import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';
import { isNone } from '@ember/utils';
import { assert } from '@ember/debug';
import CreateChangeset from './create-changeset';

export default Mixin.create(CreateChangeset, {
    //override this property with your validations object (e.g. imported one from app/validations)
    validations: null,
    cloneAttrs: null,

    setupController(controller, model) {
        this._super(...arguments);
        const validations = get(this, 'validations');
        const cloneAttrs = get(this, 'cloneAttrs');
        assert('You must provide a validations object on the "validations" property!', !isNone(validations));
        set(controller, 'changeset', this.createChangeset(model, validations, cloneAttrs));
    }
});
