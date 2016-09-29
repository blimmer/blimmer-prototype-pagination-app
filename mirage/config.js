export default function() {

  this.get('/widget-finder', function(db, request) {
    if (request.queryParams.filter === 'mod10') {
      let widgets = db.widgets.all().models;
      let filtered = widgets.filter(function(widget) {
        return widget.id % 10 === 0;
      });
      return {
        ids: filtered.mapBy('id'),
        meta: {
          total: filtered.length
        }
      };
    }
  });

  this.get('/widgets/:id');

  this.get('/widgets', function(db, request) {
    let { ids, limit, page } = request.queryParams;
    limit = +limit;
    page = +page;

    if (ids) {
      console.log('fetching with ids: ');
      console.dir(ids);
      return db.widgets.find(ids);
    } else {
      let requestedWidgets = db.widgets.all().models;
      let offset = limit * (page - 1);
      return {
        widgets: requestedWidgets.slice(offset, limit + offset),
        meta: {
          total: requestedWidgets.length
        }
      };
    }
  });
}
