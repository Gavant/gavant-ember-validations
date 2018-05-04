import EmberObject from '@ember/object';
import CreateChangesetMixin from 'gavant-ember-validations/mixins/create-changeset';
import { module, test } from 'qunit';

module('Unit | Mixin | create-changeset', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CreateChangesetObject = EmberObject.extend(CreateChangesetMixin);
    let subject = CreateChangesetObject.create();
    assert.ok(subject);
  });
});
