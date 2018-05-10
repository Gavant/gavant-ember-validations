import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | form-validator/child', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('parent', {
        registerChild: function() {},
        deregisterChild: function() {}
    });
    
    await render(hbs`{{form-validator/child parent=parent}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#form-validator/child parent=parent}}
        template block text
      {{/form-validator/child}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
