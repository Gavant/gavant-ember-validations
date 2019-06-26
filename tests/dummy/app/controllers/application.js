import Controller from '@ember/controller';
export default class ApplicationController extends Controller.extend({
    actions: {
        submitForm() {
            window.alert('submitted succesfully!');
        }
    }
}) {
}
