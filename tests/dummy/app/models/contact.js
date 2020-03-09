import DS from 'ember-data';
import attr from 'ember-data/attr';

export default class ContactModel extends DS.Model {
    @attr('string') firstName;
    @attr('string') lastName;
}
