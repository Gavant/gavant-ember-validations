import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';

import { validateNumber, validatePresence } from 'ember-changeset-validations/validators';

import createChangeset from '@gavant/ember-validations/utilities/create-changeset';

import ApplicationController from 'test-app/controllers/application';

export type RouteModel<T extends Route> = Awaited<ReturnType<T['model']>>;
const Validations = {
    name: validatePresence({ presence: true, ignoreBlank: true }),
    num: [validatePresence({ presence: true, ignoreBlank: true }), validateNumber({ gte: 1, lte: 100, integer: true })],
    radio: validatePresence({ presence: true, ignoreBlank: true }),
    nestedItem: {
        much: {
            wow: [validatePresence({ presence: true, ignoreBlank: true })]
        }
    }
};

const childValidations = {
    foo: [validatePresence({ presence: true, ignoreBlank: true })]
};

export default class Application extends Route {
    validations = Validations;

    model() {
        const changeset = createChangeset<{ name: string; num: string; radio: boolean }>(
            {
                name: null,
                num: 5,
                radio: null,
                nestedItem: {
                    much: {
                        wow: null
                    }
                }
            },
            Validations
        );
        return changeset;
    }

    setupController(controller: ApplicationController, model: RouteModel<Application>, transition: Transition) {
        super.setupController(controller, model, transition);
        const childModel = { foo: null };
        const childChangeset = createChangeset<{ foo: null }>(childModel, childValidations);
        controller.set('childChangeset', childChangeset);
    }
}
