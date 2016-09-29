import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  coalesceFindRequests: true,

  // Some sane timeout for widget-finder might make sense here.
  // This is for proof of concept.
  shouldBackgroundReloadRecord() {
    return false;
  },
});
