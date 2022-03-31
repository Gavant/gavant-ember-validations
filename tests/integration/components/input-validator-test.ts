import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | input-validator', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        await render(hbs`{{input-validator}}`);
        let element = this.element.textContent;
        assert.strictEqual(element?.trim(), '');

        // Template block usage:
        await render(hbs`
      {{#input-validator}}
        template block text
      {{/input-validator}}
    `);

        element = this.element.textContent;
        assert.strictEqual(element?.trim(), 'template block text');
    });
});
