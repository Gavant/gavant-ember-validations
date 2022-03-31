gavant-ember-validations
==============================================================================

Validation error highlighting for form fields.

DISCLAIMER: This addon is not actively maintained for public use. Pull requests are welcome, but we do not guarantee responses to bug submissions or feature requests, so use at your own risk.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install @gavant/ember-validations
```

**NOTE:** To use the addon styles, you must use SASS:
```
ember install ember-cli-sass
```

Upon addon installation, an import statement will be added to your `app.scss`:
```scss
@import "gavant-ember-validations";
```

Usage
------------------------------------------------------------------------------
This addon is bundled with [ember-changset](https://github.com/poteto/ember-changeset) and [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations/), and requires that a `Changeset` object be created from the data (e.g. a Ember Data `Model` or even just a basic POJO) that you intend to modify and validate in the form.

### Basic Example
```ts
// app/pods/foo/route.ts
import Route from '@ember/routing/route';
import Validations from 'my-app/validations/my-validations';

export default class FooRoute extends ChangesetRoute(Route) {
    validations = Validations;
}

```

```ts
// app/pods/foo/controller.ts
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FooController extends Controller {
    @action
    submit(changeset) {
        //do something with the validated changeset
        //e.g. `changeset.save()`, etc...
    }
}
```

```hbs
{{!-- app/pods/foo/template.hbs --}}
<FormValidator
    @changeset={{this.changeset}}
    @submit={{this.submit}}
    as |changeset Validator|
>
    <Validator.input @errors={{changeset.error.name.validation}}>
        <Input @value={{changeset.name}} class="form-control" autocomplete="off" />
    </Validator.input>
    <Validator.input @errors={{changeset.error.num.validation}}>
        <Input @value={{changeset.num}} class="form-control" autocomplete="off" />
    </Validator.input>
    <button type="submit" {{on "click" Validator.submit}}>
        Submit
    </button>
</FormValidator>
```

### Validating Nested Changesets with Child Validators

In more complex forms, you may have multiple changesets that need to be validated at the same time in a single form submission (for example, you have a parent model with validations, and that model then has a dynamic `hasMany` relationship of nested models, each of which needs their own changeset). For these cases, you can render "child" validators inside of the parent `<FormValidator>`, each of which are passed their own changeset. 

When the parent `<FormValidator>`'s `submit` action is invoked, it will validate each of the associated child changesets in addition to its own.

```hbs
{{!-- app/pods/foo/template.hbs --}}
<FormValidator
    @changeset={{this.changeset}}
    @submit={{this.submitForm}}
    as |changeset Validator|
>
    <Validator.input @errors={{changeset.error.name.validation}}>
        <Input @value={{changeset.name}} class="form-control" autocomplete="off" />
    </Validator.input>
    <Validator.input @errors={{changeset.error.num.validation}}>
        <Input @value={{changeset.num}} class="form-control" autocomplete="off" />
    </Validator.input>

    {{!-- 
        Render Validator.child components for each child changeset that you want to validate 
        when the form is submitted. Child changesets don't necessarily need to be structurally
        nested in the parent changeset.
    --}}
    {{#each this.childChangesets as |childChangeset|}}
        <Validator.child @changeset={{childChangeset}} as |childCS ChildValidator|>
            <ChildValidator.input @errors={{childCS.error.foo.validation}}>
                <Input @value={{childCS.foo}} class="form-control" autocomplete="off" />
            </ChildValidator.input>
        </Validator.child>
    {{/each}}
    
    <button type="submit" {{on "click" Validator.submit}}>
        Submit
    </button>
</FormValidator>
```

### Component Params

**NOTE:** Both the `<FormValidator::Child>` and `<InputValidator>` components should NEVER be used directly. Always use their contextual component version that is yielded by `<FormValidator>`.

#### `<FormValidator>`
- `@changeset: {Changeset}` - (required) The changeset object to validate
- `@submit: {Function}` - (required) An action which will be invoked upon form submission if the validation passes

#### `<Validator.child>`
- `@changeset: {Changeset}` - (required) The changeset object to validate in the child validator

#### `<Validator.input>`
- `@errors: {String[]}` - (required) An array of error message strings that will be displayed to the user when editing/submitting the field in an invalid state. Note that in almost all cases, you will pass `@errors={{changeset.error.fieldName.validation}}` here, where `fieldName` is the name of the associated property in the changeset, e.g. `changeset.error.phoneNumber.validation`.
- `@label: {Boolean}` - (optional, defaults to `false`) When true, a `<label>` will be rendered for the input using the given `@fieldLabel`. (When using components like `<FlInput>`, you'll usually leave this as `false`)
- `@fieldLabel: {String}` - (optional) The text to display in the rendered `<label>` for the input
- `@hideErrorText: {Boolean}` - (optional, defaults to `false`) When true, the field's associated error messages will NEVER be shown, even when the field is in invalid state. Useful if you have some other custom error display, or only want the error highlighting styles to show when a field is invalid.
- `@msg: {String}` - (optional) A custom error message string to display instead of the errors passed in via `@errors`. Useful if you need a custom error message that is created dynamically or defined outside of `ember-changeset-validations` normal constructs.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd gavant-ember-validations`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
