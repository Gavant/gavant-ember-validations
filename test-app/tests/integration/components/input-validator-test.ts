import { render } from '@ember/test-helpers';

import { setupRenderingTest } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | input-validator', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        await render(hbs`
        <FormValidator @changeset={{this.changeset}} as |changeset validator|>
            <validator.input @errors={{changeset.error.name.validation}} @fieldLabel="Name" @label={{true}} />
        </FormValidator>`);

        assert.dom().hasNoText();

        // Template block usage:
        await render(hbs`
        <FormValidator @changeset={{this.changeset}} as |changeset validator|>
            <validator.input @errors={{changeset.error.name.validation}} @fieldLabel="Name" @label={{true}}>
                {{! template-lint-disable require-input-label }}
                <Input @value={{changeset.name}} class="form-control" autocomplete="off" />
            </validator.input>
        </FormValidator>`);

        assert.dom('input').exists();
    });
});
