import MutableArray from '@ember/array/mutable';
import Copyable from '@ember/object/-private/copyable';
import Route from '@ember/routing/route';
import Controller from '@ember/controller';

declare global {
    interface Array<T> extends MutableArray<T>, Copyable {}
    // Use Subclass<T> to allow abstract and non-abstract subclasses of T
    // Use ConcreteSubclass<T> to allow only non-abstract subclasses of T
    type Subclass<T> = Function & { prototype: T }; // tslint:disable-line ban-types
    type ConcreteSubclass<T> = new(...args: any[]) => T;
    interface ChangesetRoute extends Route {
        changeset: any,
        validations: any
    }

    interface ChangesetController extends Controller {
        changeset: any
    }
}
