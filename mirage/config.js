export default function() {

  this.get('/widget-finder', function(db, request) {
    let widgets = db.widgets.all().models;

    let filtered;
    if (request.queryParams.filter === 'mod10') {
      filtered = widgets.filter(function(widget) {
        return widget.id % 10 === 0;
      });
    } else {
      filtered = widgets;
    }

    return {
      ids: filtered.mapBy('id'),
      meta: {
        total: filtered.length
      }
    };
  });

  this.get('/widgets/:id');

  this.get('/widgets', function(db, request) {
    let { ids, limit, page } = request.queryParams;
    limit = +limit;
    page = +page;

    return db.widgets.find(ids);
  });
}
