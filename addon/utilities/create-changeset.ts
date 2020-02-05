import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { BufferedChangeset } from 'validated-changeset/dist/types';
import DS from 'ember-data';

export interface validation {
    [key: string]: any;
}

/**
 * Creates a changeset
 * @param target The target object you want to create a changeset of. Generally a ED Model or POJO
 * @param validation The validation for the object your creating a changeset for
 * @returns The changeset created by calling `new Changeset(...)`
 */
export default function createChangeset(target: DS.Model | object, validation: validation): BufferedChangeset {
    const changeset = validation ?
        new Changeset(target, lookupValidator(validation), validation) :
        new Changeset(target);

    return changeset;
}
