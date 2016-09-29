import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  customerWidget: DS.belongsTo('customer-widget'),
});
