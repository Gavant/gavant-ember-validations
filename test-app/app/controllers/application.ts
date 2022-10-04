import Controller from '@ember/controller';
import { action } from '@ember/object';

import { GenericChangeset } from '@gavant/ember-validations/utilities/create-changeset';

import Application, { RouteModel } from 'test-app/routes/application';

export default class ApplicationController extends Controller {
    declare model: RouteModel<Application>;
    declare childChangeset: GenericChangeset<{ foo: string }>;
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
