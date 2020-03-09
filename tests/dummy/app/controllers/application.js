import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
    @action
    updateReferrer(event) {
        const id = event.target.value;
        this.changeset.set('referrer', id ? this.contacts.findBy('id', id) : null);
    }

    @action
    submitForm() {
        window.alert('submitted succesfully!');
    }

    @action
    submit(validator) {
        return validator.submit();
    }
}

