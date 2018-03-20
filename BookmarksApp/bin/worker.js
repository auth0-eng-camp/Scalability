#!/usr/bin/env node
const request = require('request');
var amqp = require('amqplib/callback_api');
var hash = require("crypto-js/sha256");
const bookmarksDB = require('../lib/db/bookmarks');
const config = require('config');
const rabbitUrl = config.get('rabbitUrl');
const queueName = config.get('queueName');
const workerConfig = config.get('worker');

var count = 0;
var tracker = 0;

function start() {
  amqp.connect(rabbitUrl, function(err, conn) {
    conn.createChannel(function(err, ch) {
  
      ch.assertQueue(queueName, {durable: true});
      ch.prefetch(workerConfig.prefecthSize);
      console.log(" [*] Waiting for messages in queue: %s. To exit press CTRL+C", queueName);
      ch.consume(queueName, function(msg) {
        count+=1;
        tracker+=1;
        console.log(`${count} messages received so far`);
        const bookmark = JSON.parse(msg.content);
        const options = {
          url: bookmark.url,
          timeout: workerConfig.timeout
        };
        request.get(options, (err, resp) => {
          const isOkay = !err && resp.statusCode === 200;
          if (!err) {
            const checksum = hash(resp.body);
          }
          console.log(options.url);
          bookmarksDB.updateStatus({ id: bookmark.id, is_ok: isOkay }, function (ex) {
            if (ex) {
              console.error(ex);
            }
            ch.ack(msg);
          });
          tracker-=1;
          if (tracker == 0) {
            console.log ('Work completed!');
            console.log (count + ' records processed');
          }
        });
      }, {noAck: false});
    });
  });
}

module.exports = {
  start: start
};

if (require.main === module) {
  start();
}