import Component from '@glimmer/component';

import { GenericChangeset } from '../../utilities/create-changeset';

interface ChangesetInputArgs<T> {
    changeset: GenericChangeset<T>;
    path: keyof T;
}

interface ChangesetInputSignature<T> {
    Args: ChangesetInputArgs<T>;
    Element: HTMLInputElement;
    Blocks: {
        default: [];
    };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class ChangesetInput<T> extends Component<ChangesetInputSignature<T>> {}
