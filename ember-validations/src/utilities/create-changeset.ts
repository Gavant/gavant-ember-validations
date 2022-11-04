import ComputedProperty from '@ember/object/computed';

import Model from '@ember-data/model';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset, ValidatorMap } from 'ember-changeset/types';

import { lookupValidator } from 'validated-changeset';

export type UnwrapComputedProperties<T> = {
    [Property in keyof T]: T[Property] extends ComputedProperty<infer U, any> ? U : T[Property];
};
export type UserModelAttributes<T extends Model> = Pick<T, Exclude<keyof T, keyof Model>>;

export type EmberModelAttributes<T extends Model> = Readonly<
    UnwrapComputedProperties<Pick<T, Exclude<keyof T, keyof UserModelAttributes<T>>>>
>;
export type ChangesetAttributes<T> = T extends Model ? UserModelAttributes<T> & EmberModelAttributes<T> : T;
export type GenericChangeset<T> = BufferedChangeset & ChangesetAttributes<T> & { data: T };

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
