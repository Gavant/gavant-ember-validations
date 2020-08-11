import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { BufferedChangeset, ValidatorMap } from 'ember-changeset/types';
import DS from 'ember-data';

export type GenericChangeset<T> = BufferedChangeset & (T extends DS.Model ? Pick<T, Exclude<keyof T, keyof DS.Model>> : T) & { data: T };

/**
 * Creates a changeset
 * @param {DS.Model | object} target The target object you want to create a changeset of. Generally a ED Model or POJO
 * @param {ValidatorMap} validation The validation for the object your creating a changeset for
 * @returns {GenericChangeset<T>}
 */
export default function createChangeset<T>(target: DS.Model | object, validations: ValidatorMap): GenericChangeset<T> {
    const changeset = (
        validations
        ? Changeset(target, lookupValidator(validations), validations)
        : Changeset(target)
    ) as GenericChangeset<T>;

    return changeset;
}
