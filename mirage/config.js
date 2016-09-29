import Ember from 'ember';
export default function() {

  this.get('/widget_finders/:filter', function(db, request) {
    let filter = request.params.filter;
    let widgets = db.widgets.all().models;

    let filtered;
    if (filter === 'default') {
      filtered = widgets;
    } else if (filter === 'mod10') {
      filtered = widgets.filter(function(widget) {
        return widget.id % 10 === 0;
      });
    }

    return {
      widget_finder: {
        id: filter,
        widget_ids: filtered.mapBy('id'),
        total: filtered.length,
      }
    };
  });

  this.get('/widgets/:id');

  this.get('/widgets', function(db, request) {
    let { ids, limit, page } = request.queryParams;
    limit = +limit;
    page = +page;

    let requestedWidgets = db.widgets.find(ids);

    if (request.requestHeaders['X-Customer']) {
      let customerWidgetIds = Ember.A([]);
      requestedWidgets.models.forEach(function(widget) {
        customerWidgetIds.pushObject(db.customerWidgets.create({
          widget,
          hasPurchased: Math.random() >= 0.5,
        }).attrs.id);
      });

      // LOL mirage 2
      let json = this.serialize(requestedWidgets);
      json.customer_widgets = this.serialize(db.customerWidgets.find(customerWidgetIds)).customer_widgets;
      return json;
    } else {
      return requestedWidgets;
    }
  });
}
