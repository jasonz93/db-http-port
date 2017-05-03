/**
 * Created by zhangsihao on 2017/5/3.
 */
'use strict';

module.exports = app => {
  const MongoClient = require('mongodb').MongoClient;
  const MongoPaging = require('mongo-cursor-pagination');
  const mongourl = process.env.MONGODB_URL || 'mongodb://localhost';
  let mongo;
  MongoClient.connect(mongourl, (err, client) => {
    if (err) {
      console.error(err);
    } else {
      mongo = client;
    }
  });

  class FullDataController extends app.Controller {
    * database() {
      if (!mongo) {
        this.ctx.body = {
          errcode: 100,
          msg: 'Cannot connect to mongodb.'
        };
        return;
      }
      const dbName = this.ctx.params.db;
      const collectionName = this.ctx.params.collection;
      const db = mongo.db(dbName);
      const collection = db.collection(collectionName);
      const result = yield new Promise((resolve, reject) => {
        MongoPaging.find(collection, {
          limit: Number(this.ctx.query.size || 10),
          next: this.ctx.query.cursor
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      this.ctx.body = result;
    }
  }
  return FullDataController;
};
