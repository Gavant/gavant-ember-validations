import DS from 'ember-data';
import { ValidatorMap } from 'ember-changeset/types';
import { ChangesetController } from 'gavant-ember-validations';
export default function ChangesetRoute<T extends ConcreteSubclass<any>>(RouteSubclass: T): {
    new (...args: any[]): {
        [x: string]: any;
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
        setupController(controller: ChangesetController, model: object | DS.Model): void;
    };
} & T;
