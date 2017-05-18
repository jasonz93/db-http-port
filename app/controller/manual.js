/**
 * Created by zhangsihao on 2017/5/17.
 */
module.exports = app => {
  const MongoPaging = require('mongo-cursor-pagination');
  const iconv = require('iconv-lite');

  class ManualController extends app.Controller {
    * updateList() {
      //url, category, platform
      const stream = yield this.ctx.getFileStream();
      const text = yield new Promise((resolve, reject) => {
        let result = '';
        stream.on('data', (data) => {
          result += iconv.decode(data, 'GBK');
        });
        stream.on('end', () => {
          resolve(result);
        });
        stream.on('error', reject);
      });
      const lines = text.split("\n");
      lines.shift();
      const docs = [];
      lines.forEach((line) => {
        const parts = line.split(',');
        if (parts.length < 4) return;
        if (parts[4].trim().length === 0) return;
        const record = {};
        switch (parts[3].trim()) {
          case '美拍':
            record.platform = 'meipai';
            break;
          case '秒拍':
            record.platform = 'miaopai';
            break;
          case '今日头条':
            record.platform = 'toutiao';
            break;
          case '爱奇艺':
            record.platform = 'iqiyi';
            break;
          case '优酷':
            record.platform = 'youku';
            break;
          case '新浪微博':
            record.platform = 'weibo';
            break;
          case 'B站':
            record.platform = 'bilibili';
            break;
          case '搜狐视频':
            record.platform = 'sohu';
            break;
          case '腾讯视频':
            break;
          default:
            this.logger.warn('Unknown platform %s', parts[3]);
            return;
        }
        record.category = parts[1].trim();
        record.url = parts[4].trim();
        docs.push(record);
      });
      const manualCollection = app.mongo.collection('manual_urls');
      this.ctx.body = yield manualCollection.insertMany(docs);
    }

    * getByPlatform() {
      const manualCollection = app.mongo.collection('manual_urls');
      const result = yield new Promise((resolve, reject) => {
        MongoPaging.find(manualCollection, {
          query: {
            platform: this.ctx.params.platform
          },
          limit: Number(this.ctx.query.size || 10),
          next: this.ctx.query.cursor
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      });
      const fakeRecords = [];
      if (!result.results) {
        result.results = [];
      }
      result.results.forEach((record) => {
        fakeRecords.push({
          result: {
            url: record.url,
            source: record.platform,
            sort: record.category
          }
        });
      });
      result.results = fakeRecords;
      this.ctx.body = result;
    }
  }

  return ManualController;
};