import Ember from 'ember';

const { inject: { service} } = Ember;

export default Ember.Controller.extend({
  store: service(),
  session: service(),

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
    },
    toggleLogin() {
      // The more advanced version of this would be to store the customer id
      // on the record and utilize `shouldReloadRecord` to determine if we have
      // the right data.
      this.get('store').unloadAll('widget-finder');
      this.get('store').unloadAll('widget');
      this.get('store').unloadAll('customer-widget');

      this.toggleProperty('session.loggedIn');
    },
  }
});
