import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'filterByIdMod10'],

  page: 1,
  filterByIdMod10: false,
  total: undefined,

  actions: {
    prev() {
      this.decrementProperty('page');
    },
    next() {
      this.incrementProperty('page');
    },
    filterByIdMod10() {
      this.set('page', 1);
      this.toggleProperty('filterByIdMod10');
    }
  }
});
