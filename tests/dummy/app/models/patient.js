import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default class PatientModel extends DS.Model {
    @attr('string') firstName;
    @attr('string') lastName;
    @belongsTo('contact', { async: false }) referrer;
}
