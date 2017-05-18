/**
 * Created by zhangsihao on 2017/5/17.
 */
module.exports = app => {
  app.beforeStart(function* () {
    app.coreLogger.info('Initializing mongo biz client');
    const MongoClient = require('mongodb').MongoClient;
    const mongourl = process.env.BIZ_MONGODB_URL || 'mongodb://localhost/yizhen-test';
    app.mongo = yield MongoClient.connect(mongourl);
  })
};