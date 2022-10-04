declare module 'ember-changeset-validations' {
    export default function lookupValidator(validationMap: object): any;
}

declare module 'ember-changeset-validations/validators' {
    export function validatePresence(options: { presence: boolean; ignoreBlank: boolean }): any;
    export function validateNumber(options: any): any;
}
