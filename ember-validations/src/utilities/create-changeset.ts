import Model from '@ember-data/model';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset, ValidatorMap } from 'ember-changeset/types';

import { lookupValidator } from 'validated-changeset';

export type GenericChangeset<T> = BufferedChangeset &
    (T extends Model ? Pick<T, Exclude<keyof T, keyof Model>> : T) & { data: T };

/**
 * Creates a changeset
 * @param {Model | object} target The target object you want to create a changeset of. Generally a ED Model or POJO
 * @param {ValidatorMap} validation The validation for the object your creating a changeset for
 * @returns {GenericChangeset<T>}
 */
export default function createChangeset<T extends Model | object>(
    target: T,
    validations: ValidatorMap
): GenericChangeset<T> {
    const changeset = (
        validations ? Changeset(target, lookupValidator(validations), validations) : Changeset(target)
    ) as GenericChangeset<T>;

    return changeset;
}
