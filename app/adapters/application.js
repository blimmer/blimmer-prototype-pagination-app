import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

const {
  computed,
  inject: { service }
} = Ember;

export default ActiveModelAdapter.extend({
  session: service(),
  coalesceFindRequests: true,

  // Some sane timeout for widget-finder might make sense here.
  // This is for proof of concept.
  shouldBackgroundReloadRecord() {
    return false;
  },

  headers: computed('session.loggedIn', function() {
    if (this.get('session.loggedIn')) {
      return {
        'X-Customer': '1'
      };
    }
  })
});
