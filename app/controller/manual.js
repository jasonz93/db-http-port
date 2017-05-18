/**
 * Created by zhangsihao on 2017/5/17.
 */
module.exports = app => {
  const MongoPaging = require('mongo-cursor-pagination');

  class ManualController extends app.Controller {
    * updateList() {
      //url, uid, category, platform

    }

    * getByPlatform() {
      manualCollection = app.mongo.collection('manual_urls');
      const result = yield new Promise((resolve, reject) => {
        MongoPaging.find(manualCollection, {
          query: {
            platform: this.ctx.params.platform
          },
          limit: Number(this.ctx.query.size || 10),
          next: this.ctx.query.cursor
        })
      });
      const fakeRecords = [];
      if (!result.results) {
        result.results = [];
      }
      result.results.forEach((record) => {
        fakeRecords.push({
          url: record.url,
          uid: record.uid,
          source: record.platform,
          sort: record.category
        });
      });
    }
  }

  return ManualController;
};