import Route from '@ember/routing/route';
import ChangesetRoute from 'gavant-ember-validations/decorators/changeset-route';
import { validatePresence } from 'ember-changeset-validations/validators';

const Validations = {
    name: [validatePresence({presence: true, ignoreBlank: true})],
    radio: [validatePresence({presence: true})]
};

@ChangesetRoute
export default class Application extends Route {
    validations = Validations;
    model() {
        return {
            name: null,
            radio: null
        };
    }
}
