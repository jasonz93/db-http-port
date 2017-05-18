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

const author_urls = {
  bilibili: [
    'http://space.bilibili.com/39625415/#!/',
    'http://space.bilibili.com/1532165/#!/',
    'http://space.bilibili.com/12717243/#!/',
    'http://space.bilibili.com/96207728/#!/',
    'http://space.bilibili.com/883968/#!/'
  ],
  sohu: [
    'http://my.tv.sohu.com/user/314973468',
    'http://my.tv.sohu.com/user/291898817',
    'http://my.tv.sohu.com/user/312751315',
    'http://my.tv.sohu.com/user/gaoxiaodang',
    'http://my.tv.sohu.com/user/304342645'
  ],
  iqiyi: [
    'http://www.iqiyi.com/u/1402037836',
    'http://www.iqiyi.com/u/2433577307',
    'http://www.iqiyi.com/u/2262788876',
    'http://www.iqiyi.com/u/2396091088',
    'http://www.iqiyi.com/u/1390376387'
  ],
  meipai: [
    'http://www.meipai.com/user/1480602404',
    'http://www.meipai.com/user/21122941',
    'http://www.meipai.com/user/1458601295',
    'http://www.meipai.com/user/1051625259',
    'http://www.meipai.com/user/1088328537'
  ]
};

const MongoClient = require('mongodb').MongoClient;

(async () => {
  const mongo = await MongoClient.connect('mongodb://root:Y2bay6n2F@dds-2ze9902b2d6e4f141.mongodb.rds.aliyuncs.com:3717,dds-2ze9902b2d6e4f142.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3244669');
  console.log('Mongo connected.');
  const db = mongo.db('yizhen-test');
  const collection = db.collection('monitor_tasks');
  let authors = [];
  for (let platform in author_urls) {
    author_urls[platform].forEach((author_url) => {
      authors.push({
        type: 'author',
        platform: platform,
        url: author_url,
        interval: 10,
        start_time: now,
        end_time: now + 12000000,
        next_tick: now
      });
    })
  }
  await collection.insertMany(authors);
  console.log('Inserted %d authors.', authors.length);
})();