import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import DS from 'ember-data';

interface validation {
    [key: string]: any;
}

export default function createChangeset(target: DS.Model | object, validations: validation) {
    const changeset = validations ?
        new Changeset(target, lookupValidator(validations), validations) :
        new Changeset(target);

    return changeset;
}
