import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
    @action
    submitForm() {
        window.alert('submitted succesfully!');
    }

    @action
    submit(validator) {
        return validator.submit();
    }

    @action
    updateRadio(value) {
        this.changeset.radio = value;
    }
}
