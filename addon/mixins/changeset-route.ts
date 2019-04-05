import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import createChangeset from '../utilities/create-changeset';
import { get, set } from '@ember/object';
import DS from 'ember-data';

export default Mixin.create({
    setupController(this: ChangesetRoute, controller: ChangesetController, model: DS.Model) {
        this._super(...arguments);
        const validations = get(this, 'validations');
        assert('You must provide a validations object on the "validations" property!', !isNone(validations));
        set(controller, 'changeset', createChangeset(model, validations));
    }
});
