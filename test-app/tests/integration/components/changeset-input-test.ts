import { render } from '@ember/test-helpers';

import { validatePresence } from 'ember-changeset-validations/validators';
import { setupRenderingTest } from 'ember-qunit';

import createChangeset from '@gavant/ember-validations/utilities/create-changeset';

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | changeset-input', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });
        const Validations = {
            nestedItem: {
                much: {
                    wow: [validatePresence({ presence: true, ignoreBlank: true })]
                }
            }
        };

        this.set('changeset', createChangeset({ nestedItem: { much: { wow: '' } } }, Validations));

        await render(hbs`<ChangesetInput @changeset={{this.changeset}}
        @path="nestedItem.much.wow"
        class="form-control"
        autocomplete="off" />`);

        assert.strictEqual(this.element.textContent?.trim(), '');
    });
});
