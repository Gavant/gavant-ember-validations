import Route from '@ember/routing/route';
import ChangesetRoute from '@gavant/ember-validations/mixins/changeset-route';
import {
    validatePresence,
    validateNumber,
} from 'ember-changeset-validations/validators';
import createChangeset from '@gavant/ember-validations/utilities/create-changeset';

const Validations = {
    name: [validatePresence({ presence: true, ignoreBlank: true })],
    num: [
        validatePresence({ presence: true, ignoreBlank: true }),
        validateNumber({ gte: 1, lte: 100, integer: true }),
    ],
    radio: [validatePresence({ presence: true })],
    nestedItem: {
        much: {
            wow: [validatePresence({ presence: true, ignoreBlank: true })],
        },
    },
};

const childValidations = {
    foo: [validatePresence({ presence: true, ignoreBlank: true })],
};

export default class Application extends ChangesetRoute(Route) {
    validations = Validations;

    model() {
        return {
            name: null,
            num: 5,
            radio: null,
        };
    }

    setupController(controller) {
        super.setupController(...arguments);
        const childModel = { foo: null };
        const childChangeset = createChangeset(childModel, childValidations);
        controller.set('childChangeset', childChangeset);
    }
}
