import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import createChangeset from './create-changeset';

export default function changesetRoute(RouteSubclass) {
    class ChangesetRoute extends RouteSubclass {
        constructor() {
            super();
            this.validations = null;
            this.cloneAttrs = null;
        }

        setupController(controller, model) {
            super.setupController(controller, model);
            const validations = this.validations;
            const cloneAttrs = this.cloneAttrs;
            assert('You must provide a validations object on the "validations" property!', !isNone(validations));
            controller.changeset = this.createChangesetInstance(model, validations, cloneAttrs);
        }

        createChangesetInstance() {
            return createChangeset();
        }

    }
    return ChangesetRoute;
}
