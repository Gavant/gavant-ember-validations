import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import createChangeset from '../utilities/create-changeset';
//
// const changesetRoute = decorator((RouteSubclass) => {
//
// });

export default function changesetRoute(RouteSubclass) {
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
}

// const changesetRoute = decorators();
//
// export function decorators(fn) {
//     return function(...params) {
//         // determine if user called as @computed('blah', 'blah') or @computed
//         return desc => fn(desc, params)
//     };
// }

// export default changesetRoute;
