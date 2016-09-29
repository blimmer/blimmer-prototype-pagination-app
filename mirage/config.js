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

    return db.widgets.find(ids);
  });
}
