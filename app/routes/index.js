import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  ajax: service(),

  queryParams: {
    page: {
      refreshModel: true,
    },
    filterByIdMod10: {
      refreshModel: true,
    }
  },

  limit: 5, // we could dynamically serve less to mobile if we want

  _setTotal(total) {
    this.controllerFor(this.routeName).set('total', total);
  },

  model(params) {
    let store = this.store;

    let finderRequest = 'widget-finder';
    if (params.filterByIdMod10) {
      finderRequest += '?filter=mod10';
    }

    return this.get('ajax').request(finderRequest).then((res) => {
      this._setTotal(res.meta.total);

      let page = params.page;
      let limit = this.get('limit');

      let offset = limit * (page - 1);

      let pageOfIds = res.ids.slice(offset, limit + offset);

      // I'd like to wrap this logic up into a store method
      let toRequest = pageOfIds.reject((id) => {
        return store.hasRecordForId('widget', id);
      });

      let promise;
      if (toRequest.length > 0) {
        promise = this.store.query('widget', {
          ids: toRequest
        });
      } else {
        promise = Ember.RSVP.resolve();
      }

      return promise.then(() => {
        let widgets = Ember.A([]);
        pageOfIds.forEach(function(id) {
          widgets.pushObject(store.peekRecord('widget', id));
        });

        return widgets;
      });
    });
  }
});
