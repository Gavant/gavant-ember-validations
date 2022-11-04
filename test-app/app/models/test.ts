import Model, { attr } from '@ember-data/model';

export default class Test extends Model {
    @attr('string') declare name: string;
    @attr('string') declare description: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        test: Test;
    }
}
