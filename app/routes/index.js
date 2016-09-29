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

    if (params.filterByIdMod10) {
      return this.get('ajax').request('widget-finder?filter=mod10').then((res) => {
        this._setTotal(res.meta.total);

        let page = params.page;
        let limit = this.get('limit');

        let offset = limit * (page - 1);

        let pageOfIds = res.ids.slice(offset, limit + offset);

        let toRequest = pageOfIds.reject((id) => {
          return store.hasRecordForId('widget', id);
        });

        return this.store.query('widget', {
          ids: toRequest
        }).then(() => {
          let widgets = Ember.A([]);
          pageOfIds.forEach(function(id) {
            widgets.pushObject(store.peekRecord('widget', id));
          });

          return widgets;
        });
      });
    } else {
      return store.query('widget', {
        limit: this.get('limit'),
        page:  params.page,
      }).then((res) => {
        this._setTotal(res.meta.total);
        return res;
      });
    }
  }
});
