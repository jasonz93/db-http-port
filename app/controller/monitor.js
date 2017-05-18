/**
 * Created by zhangsihao on 2017/5/15.
 */
const uuid = require('uuid');

module.exports = app => {
  const MongoClient = require('mongodb').MongoClient;

  class MonitorController extends app.Controller {
    constructor() {
      super();
      this.taskCollection = app.mongo.collection('monitor_tasks');
    }

    * tasks() {
      const now = new Date().getTime();
      const cursor = uuid.v4();
      yield this.taskCollection.updateMany({
        $or: [
          {
            type: this.ctx.params.type,
            start_time: {
              $lte: now
            },
            end_time: {
              $gte: now
            },
            next_tick: {
              $lte: now
            },
            locked_at: {
              $lt: now - 300000
            }
          },
          {
            type: this.ctx.params.type,
            start_time: {
              $lte: now
            },
            end_time: {
              $gte: now
            },
            next_tick: {
              $lte: now
            },
            locked_at: null
          }
        ]
      }, {
        $set: {
          locked_at: now,
          locked_by: cursor
        }
      });
      const tasks = yield this.taskCollection.find({
        locked_by: cursor
      }).toArray();
      const result = [];
      for (let i = 0; i < tasks.length; i ++) {
        let task = yield this.taskCollection.findOneAndUpdate({
          _id: tasks[i]._id
        }, {
          $set: {
            next_tick: parseInt(now + tasks[i].interval * 1000)
          },
          $unset: {
            locked_at: 1,
            locked_by: 1
          }
        }, {
          returnOriginal: false
        });
        result.push(task);
      }
      this.ctx.body = {
        results: result
      };
    }
  }

  return MonitorController;
};