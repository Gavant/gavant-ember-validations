import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        submitForm() {
            window.alert('submitted succesfully!');
        },

        submit(validator) {
            return validator.submit();
        }
    }
});
