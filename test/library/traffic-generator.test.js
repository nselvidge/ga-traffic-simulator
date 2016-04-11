'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const TrafficGenerator = require('../../library/traffic-generator.js');

describe('TrafficGenerator', () => {
  const defaultConfig = {host: 'test', domain: 'test', path: 'test'}
  describe('#constructor', () => {
    it('Should store the default hit and the modifiers', () => {
      const RTG = new TrafficGenerator(defaultConfig);
      expect(RTG.defaultHit).to.exist;
      expect(RTG.modifiers).to.exist;
    });
  });

  describe('#addModifier', () => {
    it('Should add a modifier to the instance', () => {
      const RTG = new TrafficGenerator(defaultConfig);
      RTG.addModifier({modify: () => {}});
      expect(RTG.modifiers.length).to.equal(2);
    })
  })

  describe('#generate', () => {
    it('Should throw an error when input is not a number', () => {
      const TG = new TrafficGenerator(defaultConfig);
      try {
        TG.generate({});
      } catch(err) {
        expect(err).to.be.an.error;
      }
    });
    it('Should return a default hit when there are no modifiers', function() {
      const TG = new TrafficGenerator(defaultConfig);
      const hits = TG.generate(1);
      expect(hits).to.deep.equal([TG.defaultHit]);
    });
    it('Should return the number of hits it is given', function() {
      const TG = new TrafficGenerator(defaultConfig);
      const hits = TG.generate(5);
      expect(hits.length).to.equal(5);
    });
    it('Should run any supplied modifiers on each hit', () => {
      const sampleModifier = {
        modify: (hit) => {
          hit.dummy = 'added';
          return hit;
        }
      };
      const TG = new TrafficGenerator(defaultConfig, [sampleModifier]);
      const hits = TG.generate(1);
      expect(hits[0].dummy).to.equal('added');
    })
  });
})