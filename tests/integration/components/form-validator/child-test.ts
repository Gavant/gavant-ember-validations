import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | form-validator/child', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        this.set('parent', {
            registerChild: function () {},
            deregisterChild: function () {}
        });

        await render(hbs`{{form-validator/child parent=parent}}`);
        let element = this.element.textContent;
        assert.strictEqual(element?.trim(), '');

        // Template block usage:
        await render(hbs`
      {{#form-validator/child parent=parent}}
        template block text
      {{/form-validator/child}}
    `);

        element = this.element.textContent;
        assert.strictEqual(element?.trim(), 'template block text');
    });
});
