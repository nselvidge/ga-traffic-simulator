'use strict';
/**
 * Sends the simulated hits to GA
 */
const Promise = require('bluebird');
const ua = Promise.promisifyAll(require('universal-analytics'));

class TrafficSender {
  constructor(trackingId) {
    if(!trackingId || typeof trackingId !== 'string'){
      throw new Error('invalid or missing tracking ID.');
    }
    this.ua = ua;
    this.trackingId = trackingId;
    return this;
  }
  /**
   * Sends an array of hits to Google Analytics
   * 
   * @param  {Array}                  data  an array of hits
   * @return {Promise<Array, Error>}  
   */
  send(hits) {
    const self = this;
    if(!Array.isArray(hits)){
      return Promise.reject(new Error('invalid format for hits to send. Must be an array of objects'));
    }
    const results = Promise.map(hits, (hit) => {
      let visitor = ua(self.trackingId);
      return visitor.pageview(hit).sendAsync();
    });

    return results;
  }
}

module.exports = TrafficSender;