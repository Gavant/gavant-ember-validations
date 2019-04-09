import DS from 'ember-data';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import createChangeset from '../utilities/create-changeset';

/**
 * Adds functionality to `setupController`. Be sure to call `super` in the respective methods to ensure this runs
 * @param route The route you want the functionality to be added on to
 */
export default function changesetRoute<T extends ConcreteSubclass<any>>(RouteSubclass: T) {
    class ChangesetRoute extends RouteSubclass {
        setupController(controller: ChangesetController, model: DS.Model) {
            super.setupController(controller, model);
            const validations = this.validations;
            assert('You must provide a validations object on the "validations" property!', !isNone(validations));
            controller.changeset = createChangeset(model, validations);
        }
    }
    return ChangesetRoute;
}
