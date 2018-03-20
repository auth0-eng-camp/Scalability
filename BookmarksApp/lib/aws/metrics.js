var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

var cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});

module.exports = function publishMetric(queueSize) {
  const params = {
    MetricData: [
      {
        MetricName: 'QUEUE_SIZE',
        Unit: 'None',
        Value: queueSize
      },
    ],
    Namespace: 'WORKER'
  };
  
  cw.putMetricData(params, function(err, data) {
    if (err) {
      console.error("Error when publishing metric", err);
    } else {
      console.log("Metric published successfully", data);
    }
  });
}