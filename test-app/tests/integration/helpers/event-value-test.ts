import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Helper | event-value', function (hooks) {
    setupRenderingTest(hooks);

    // Replace this with your real tests.
    test('it renders', async function (assert) {
        this.set('inputValue', '1234');
        await render(hbs`
        <input value="{{this.inputValue}}"
        ...attributes
        {{on 'input' (event-value )}}
    />`);

        assert.strictEqual(this.element.textContent?.trim(), '');
    });
});
