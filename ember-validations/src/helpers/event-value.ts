import { helper } from '@ember/component/helper';

/**
 * A wrapper/helper to get the value from an input event
 *
 * @export
 * @param {[(value: string) => void]} [fn]
 * @return {*}
 */
export function eventValue([fn]: [(value: string) => void]) {
    return (event: InputEvent) => fn((event.target as HTMLInputElement)?.value);
}

export default helper(eventValue);
