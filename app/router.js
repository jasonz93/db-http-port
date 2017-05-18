'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/data/full/spider/:db/:collection', 'full.database');
  app.get('/monitor/tasks/:type/:platform', 'monitor.tasks');
  app.get('/manual/urls/:platform', 'manual.getByPlatform');
};
