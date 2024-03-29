import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | form-validator/child', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        await render(
            hbs`
                <FormValidator @changeset={{this.changeset}} as |changeset validator|>
                    <validator.child @changeset={{this.childChangeset}} />
                </FormValidator>`
        );
        assert.dom().hasNoText();

        // Template block usage:
        await render(hbs`
        <FormValidator @changeset={{this.changeset}} as |changeset validator|>
            <validator.child @changeset={{this.childChangeset}}>
                template block text
            </validator.child>
        </FormValidator>
        `);

        assert.dom().containsText('template block text');
    });
});
