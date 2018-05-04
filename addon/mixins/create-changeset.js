import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';
import { copy } from '@ember/object/internals';
import { isArray } from '@ember/array';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Mixin.create({
    createChangeset(target, validations, cloneAttrs) {
        const changeset = validations ?
            new Changeset(target, lookupValidator(validations), validations) :
            new Changeset(target);

        //create a copy of attributes whose values are passed by reference
        //and set the copy on the changeset so that changes do not affect the target
        if(isArray(cloneAttrs)) {
            cloneAttrs.forEach((attr) => {
                let value = get(target, attr);
                let clonedValue = isArray(value) ? value.toArray() : copy(value);
                set(changeset, attr, clonedValue);
            });
        }

        return changeset;
    }
});
