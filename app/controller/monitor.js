/**
 * Created by zhangsihao on 2017/5/15.
 */
const uuid = require('uuid');

module.exports = app => {
  class MonitorController extends app.Controller {
    * tasks() {
      const taskCollection = this.app.mongo.collection('monitor_tasks');
      const now = new Date().getTime();
      const cursor = uuid.v4();
      yield taskCollection.updateMany({
        $or: [
          {
            type: this.ctx.params.type,
            platform: this.ctx.params.platform,
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
            platform: this.ctx.params.platform,
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
      const tasks = yield taskCollection.find({
        locked_by: cursor
      }).toArray();
      const result = [];
      for (let i = 0; i < tasks.length; i ++) {
        let task = yield taskCollection.findOneAndUpdate({
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
        result.push(task.value);
      }
      this.ctx.body = {
        results: result
      };
    }
  }

  return MonitorController;
};