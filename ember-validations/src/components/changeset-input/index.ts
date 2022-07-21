import Component from '@glimmer/component';

import { GenericChangeset } from '../../utilities/create-changeset';

interface ChangesetInputArgs<T> {
    changeset: GenericChangeset<T>;
    path: keyof T;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class ChangesetInput<T> extends Component<ChangesetInputArgs<T>> {}
