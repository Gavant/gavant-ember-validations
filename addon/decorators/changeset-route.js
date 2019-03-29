import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import createChangeset from '../utilities/create-changeset';
import { decorator } from '@ember-decorators/utils/decorator';

const changesetRoute = decorator((RouteSubclass) => {
    class ChangesetRoute extends RouteSubclass {
        setupController(controller, model) {
            // this._super(...arguments);
            super.setupController(controller, model);
            const validations = this.validations;
            const cloneAttrs = this.cloneAttrs;
            assert('You must provide a validations object on the "validations" property!', !isNone(validations));
            controller.changeset = this.createChangesetInstance(model, validations, cloneAttrs);
        }

        createChangesetInstance() {
            return createChangeset(...arguments);
        }

    }
    return ChangesetRoute;
});

export default changesetRoute;

// const changesetRoute = decorators();
//
// export function decorators(fn) {
//     return function(...params) {
//         // determine if user called as @computed('blah', 'blah') or @computed
//         return desc => fn(desc, params)
//     };
// }

// export default changesetRoute;
