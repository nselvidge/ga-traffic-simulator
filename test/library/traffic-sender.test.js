'use strict';

const TrafficSender = require('../../library/traffic-sender.js');
const expect = require('chai').expect;
const gaStub = require('nock')('http://www.google-analytics.com');
const sinon = require('sinon');


describe('TrafficSender', () => {
  describe('#constructor', () => {
    it('Should throw an error when no tracking ID is added', function() {
      try {
        const trafficSender = new TrafficSender();
      } catch(err) {
        expect(err).to.be.an.error;
      }
    })
  })
  describe('#send', () => {
    it('Should throw an error when data is not an array', function() {
      const trafficSender = new TrafficSender('UA-123456-1');
      return trafficSender.send('test')
        .catch((err) => {
          expect(err).to.be.an.error;
        });
    });
    it('Should send a post request to GA for each hit passed through', () => {
      const collectSpy = sinon.spy();      
      const trafficSender = new TrafficSender('UA-123456-1');
      const hits = [
        {dt: 'test', dp: 'test', dh: 'test'},
        {dt: 'test', dp: 'test', dh: 'test'},
      ];
      hits.forEach(() => {
        gaStub.post('/collect').reply(() => {
          collectSpy();
          return [200, {}];
        });
      });
      return trafficSender.send(hits).then(() => {
        expect(collectSpy.callCount).to.equal(hits.length);
      });
    });
  });
})