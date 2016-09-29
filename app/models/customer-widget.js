import DS from 'ember-data';

export default DS.Model.extend({
  widget: DS.belongsTo('widget'),
  hasPurchased: DS.attr('boolean'),
});
