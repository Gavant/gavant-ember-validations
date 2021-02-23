import { helper } from '@ember/component/helper';

export function eventValue([fn]: [(value: string) => void]) {
    return (event: InputEvent) => fn((event.target as HTMLInputElement)?.value);
}

export default helper(eventValue);
