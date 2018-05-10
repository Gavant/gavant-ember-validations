import Route from '@ember/routing/route';
import ChangesetRoute from 'gavant-ember-validations/mixins/changeset-route';
import { validatePresence } from 'ember-changeset-validations/validators';

const validations = {
    name: [validatePresence({presence: true, ignoreBlank: true})],
    radio: [validatePresence({presence: true})]
};

export default Route.extend(ChangesetRoute, {
    validations,

    model() {
        return {
            name: null,
            radio: null
        };
    }
});
