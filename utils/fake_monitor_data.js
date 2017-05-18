/**
 * Created by zhangsihao on 2017/5/18.
 */
const video_urls = [
  'http://www.bilibili.com/video/av10590955/',
  'http://www.bilibili.com/video/av10594912/',
  'http://www.bilibili.com/video/av10573534/',
  'http://www.bilibili.com/video/av10584052/?tg',
  'http://www.bilibili.com/video/av10598007/',
  'http://www.bilibili.com/video/av7992493/'
];

const now = new Date().getTime();

const authors = [
  {
    type: 'author',
    platform: 'bilibili',
    url: 'http://space.bilibili.com/39625415/#!/',
    interval: 10,
    start_time: now,
    end_time: now + 1200000,
    next_tick: now
  },
  {
    type: 'author',
    platform: 'bilibili',
    url: 'http://space.bilibili.com/1532165/#!/',
    interval: 20,
    start_time: now,
    end_time: now + 1200000,
    next_tick: now
  },
  {
    type: 'author',
    platform: 'bilibili',
    url: 'http://space.bilibili.com/12717243/#!/',
    interval: 30,
    start_time: now,
    end_time: now + 1200000,
    next_tick: now
  },
  {
    type: 'author',
    platform: 'bilibili',
    url: 'http://space.bilibili.com/96207728/#!/',
    interval: 20,
    start_time: now + 600000,
    end_time: now + 1200000,
    next_tick: now + 600000
  },
  {
    type: 'author',
    platform: 'bilibili',
    url: 'http://space.bilibili.com/883968/#!/',
    interval: 20,
    start_time: now,
    end_time: now + 1200000,
    next_tick: now
  }
];

const MongoClient = require('mongodb').MongoClient;

(async () => {
  const mongo = await MongoClient.connect('mongodb://root:Y2bay6n2F@dds-2ze9902b2d6e4f141.mongodb.rds.aliyuncs.com:3717,dds-2ze9902b2d6e4f142.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3244669');
  const db = mongo.db('yizhen-test');
  const collection = db.collection('monitor_tasks');
  await collection.insertMany(authors);
})();