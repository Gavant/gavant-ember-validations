import Route from '@ember/routing/route';
import ChangesetRoute from '@gavant/ember-validations/mixins/changeset-route';
import { validatePresence /*, validateNumber */ } from 'ember-changeset-validations/validators';
import createChangeset from '@gavant/ember-validations/utilities/create-changeset';
import { A } from '@ember/array';

const Validations = {
    firstName: [validatePresence({presence: true, ignoreBlank: true})],
    lastName: [validatePresence({presence: true, ignoreBlank: true})],
    referrer: [validatePresence({presence: true})]
    // num: [validatePresence({presence: true, ignoreBlank: true}), validateNumber({gte: 1, lte: 100, integer: true})],
    // radio: [validatePresence({presence: true})]
};

const childValidations = {
    foo: [validatePresence({presence: true, ignoreBlank: true})]
};

export default class Application extends ChangesetRoute(Route) {
    validations = Validations;

    beforeModel() {
        const contacts = A();
        for(let i = 0; i <= 5; i++) {
            contacts.push(this.store.createRecord('contact', {
                id: i,
                firstName: 'Contact',
                lastName: `# ${i}`
            }));
        }

        this.contacts = contacts;
    }

    model() {
        return this.store.createRecord('patient', {
            firstName: '',
            lastName: ''
        });
    }

    setupController(controller) {
        super.setupController(...arguments);
        const childModel = { foo: null };
        const childChangeset = createChangeset(childModel, childValidations);
        controller.set('childChangeset', childChangeset);
        controller.set('contacts', this.contacts);
    }
}
