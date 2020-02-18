import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { BufferedChangeset, ValidatorMap } from 'ember-changeset/types';
import DS from 'ember-data';

/**
 * Creates a changeset
 * @param target The target object you want to create a changeset of. Generally a ED Model or POJO
 * @param validation The validation for the object your creating a changeset for
 * @returns The changeset created by calling `new Changeset(...)`
 */
export default function createChangeset(target: DS.Model | object, validations: ValidatorMap): BufferedChangeset {
    const changeset = validations ?
        Changeset(target, lookupValidator(validations), validations) :
        Changeset(target);

    return changeset;
}
