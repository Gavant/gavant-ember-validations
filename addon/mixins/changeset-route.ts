import DS from 'ember-data';
import { set } from '@ember/object';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { ValidatorMap } from 'ember-changeset/types';

import { ChangesetController } from 'gavant-ember-validations';
import createChangeset from '../utilities/create-changeset';

export default function ChangesetRoute<T extends ConcreteSubclass<any>>(RouteSubclass: T) {
    class ChangesetRouteClass extends RouteSubclass {
        /**
         * A validations object to use for the route's changeset in the shape
         * required by ember-changeset-validations
         *
         * @type {object}
         * @memberof ChangesetRouteClass
         */
        validations?: ValidatorMap;

        /**
         * Extends `setupController()` to create a `Changeset` for the route's model using the validations
         * object defined on the route's `validations` property, and assigns the changeset to a `changeset`
         * property on the controller.
         * @param {Controller} controller
         * @param {{}} model
         * @memberof ChangesetRouteClass
         */
        setupController(controller: ChangesetController, model: DS.Model | object): void {
            super.setupController(controller, model);
            assert('You must provide a validations object on the "validations" property!', !isNone(this.validations));
            set(controller, 'changeset', createChangeset(model, this.validations!));
        }
    }

    return ChangesetRouteClass;
}
