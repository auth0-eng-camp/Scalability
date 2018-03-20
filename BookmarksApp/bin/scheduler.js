#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
const bookmarksDB = require('../lib/db/bookmarks');
const publishMetric = require('../lib/aws/metrics');
const config = require('config');
const rabbitUrl = config.get('rabbitUrl');
const queueName = config.get('queueName');

let ch = undefined;

function start() {
  amqp.connect(rabbitUrl, function(err, conn) {
    if (err) {
      console.error('Unable to connect to rabbit.');
      process.exit(1);
    }
    conn.createChannel(function(err, channel) {
      if (err) {
        console.error('Unable to create rabbit channel.');
        process.exit(1);
      }
      ch = channel;
      setInterval(function() {
        ch.assertQueue(queueName, {}, function(err, info){
          console.log(`${info.messageCount} messages in queue`);
          if (process.env.NODE_ENV == "aws") {
            publishMetric(info.messageCount);
          }
        });
      }, 5000);
      run();
    });
  });  
}

function run() {  
  if (!ch) {
    console.error("Channel hasn't been created yet");
    process.exit(1);
  }

  bookmarksDB.findAll(function (err, records) {
    records.forEach(b => {
      console.log(`Queueing bookmark: ${b.id}`);
      ch.assertQueue(queueName, {durable: true});
      ch.sendToQueue(queueName, Buffer.from(JSON.stringify(b)), {persistent: true});
      })
  });
}

module.exports = {
  start: start
};

if (require.main === module) {
  start();
}