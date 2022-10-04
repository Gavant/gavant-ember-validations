// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/using-glint/ember/authoring-addons
import ChangesetInput from 'components/changeset-input';
import FormValidator from 'components/form-validator';
import FormValidatorChild from 'components/form-validator/child';
import InputValidator from 'components/input-validator';
import EventValue from 'helpers/event-value';

declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        ChangesetInput: typeof ChangesetInput;
        FormValidator: typeof FormValidator;
        'FormValidator::Child': typeof FormValidatorChild;
        InputValidator: typeof InputValidator;
        'event-value': typeof EventValue;
    }
}
