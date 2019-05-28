import EmberObject from '@ember/object';
import ChangesetRouteMixin from '@gavant/ember-validations/mixins/changeset-route';
import { module, test } from 'qunit';

module('Unit | Mixin | changeset-route', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ChangesetRouteObject = EmberObject.extend(ChangesetRouteMixin);
    let subject = ChangesetRouteObject.create();
    assert.ok(subject);
  });
});
