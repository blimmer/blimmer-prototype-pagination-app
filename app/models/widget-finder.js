import DS from 'ember-data';

export default DS.Model.extend({
  widgetIds: DS.attr(),
  total: DS.attr('number'),
});
