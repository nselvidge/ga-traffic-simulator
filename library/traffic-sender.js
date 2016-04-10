'use strict';
/**
 * Sends the traffic Objects to GA
 */
const Promise = require('bluebird');
const ua = Promise.promisifyAll(require('universal-analytics'));

function TrafficSender(trackingId) {
  this.trackingId = trackingId;
  return this;
}

TrafficSender.prototype.send = function(data) {
  const self = this;
  if(typeof data !== 'Array'){
    throw new Error('invalid data format to send. Must be an array of objects');
  }
  data.forEach((hit) => {
    let visitor = ua(self.trackingId);
    visitor.pageview(hit).send();
  })
}