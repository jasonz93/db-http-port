/**
 * Created by zhangsihao on 2017/5/17.
 */
const MongoClient = require('mongodb').MongoClient;

module.exports = app => {
  app.beforeStart(function* () {
    app.coreLogger.info('Initializing mongo biz client');
    const mongourl = process.env.BIZ_MONGODB_URL || 'mongodb://localhost/yizhen-test';
    app.mongo = yield MongoClient.connect(mongourl);
    app.coreLogger.info('Mongo biz client initialized.');
  })
};