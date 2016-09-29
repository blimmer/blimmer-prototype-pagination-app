import Ember from 'ember';

export default Ember.Route.extend({
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

    let finderId = 'default';
    if (params.filterByIdMod10) {
      finderId = 'mod10';
    }

    return store.findRecord('widget-finder', finderId).then((res) => {
      this._setTotal(res.get('total'));

      let page = params.page;
      let limit = this.get('limit');

      let offset = limit * (page - 1);

      let pageOfIds = res.get('widgetIds').slice(offset, limit + offset);

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
