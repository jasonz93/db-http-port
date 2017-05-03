'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/data/full/spider/:db/:collection', 'all.database');
};
