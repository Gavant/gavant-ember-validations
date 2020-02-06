import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import createChangeset from '../utilities/create-changeset';

type Constructor<T = Route> = new (...args: any[]) => T;

export default function ChangesetRoute<TBase extends Constructor>(Base: TBase) {
    class ChangesetRouteClass extends Base {
        /**
         * A validations object to use for the route's changeset in the shape
         * required by ember-changeset-validations
         *
         * @type {object}
         * @memberof ChangesetRouteClass
         */
        validations?: ChangesetValidationsMap;

        /**
         * Extends `setupController()` to create a `Changeset` for the route's model using the validations
         * object defined on the route's `validations` property, and assigns the changeset to a `changeset`
         * property on the controller.
         * @param {Controller} controller
         * @param {{}} model
         * @memberof ChangesetRouteClass
         */
        setupController(controller: ChangesetController, model: {}): void {
            super.setupController(controller, model);
            assert('You must provide a validations object on the "validations" property!', !isNone(this.validations));
            set(controller, 'changeset', createChangeset(model, this.validations!));
        }
    }

    return ChangesetRouteClass;
}
