'use strict';

const expect = require('chai').expect;
const Modifier = require('../../library/modifier.js');
const ModifierRandomValue = require('../../library/modifier-random-value.js');

describe('Modifier', () => {
  const defaultConfig = {
    modifiers: {
      randomValue: [{
        range: [0,1],
        key: 'random'
      }]
    }
  };
  const defaultHit = {
    myKey: 'myValue'
  };
  const anotherDefaultHit = {
    myKey: 'myValue'
  }
  describe('#constructor', () => {
    it('Should return an instance of Modifier', () => {
      const modifier = new ModifierRandomValue(defaultConfig);
      expect(modifier).to.be.an.instanceof(Modifier);
    });
  });
  describe('#modify', () => {
    it('Should return the given hit with a random value for the given key', () => {
      
      const modifier = new ModifierRandomValue(defaultConfig);
      const modifiedHit = modifier.modify(defaultHit);
      const anotherModifiedHit = modifier.modify(anotherDefaultHit);
      expect(modifiedHit.random).to.be.a.number;
      // There is a chance this will result in a false negative...
      expect(anotherModifiedHit.random).to.not.equal(modifiedHit.random);
    });
    it('Should add multiple keys when set in config', () => {
      const defaultHit = {
        myKey: 'myValue'
      };
      const anotherDefaultHit = {
        myKey: 'myValue'
      }
      const altConfig = {
        modifiers: {
          randomValue: [{
            range: [0, 1],
            key: 'random'
          }, {
            type: 'discrete',
            range: [2],
            key: 'random2'
          }]
        }
      }
      const modifier = new ModifierRandomValue(altConfig);
      const modifiedHit = modifier.modify(defaultHit);
      const anotherModifiedHit = modifier.modify(anotherDefaultHit);
      expect(modifiedHit.random).to.be.a.number;
      expect(modifiedHit.random2).to.be.a.number;
      // There is a chance this will result in a false negative...
      expect(anotherModifiedHit.random).to.not.equal(modifiedHit.random);
      expect(anotherModifiedHit.random2).to.equal(2);
    });
  });
  describe('addRandomNumber', () => {
    it('should return a random value for the key', () => {
      const modifier = new ModifierRandomValue(defaultConfig);
      const hit = modifier.addRandomNumber(defaultHit, defaultConfig.modifiers.randomValue[0]);
      expect(hit).to.have.property('random');
    });
  });
  describe('addDiscreteValue', () => {
    it('should return a random value for the key', () => {
      const config = {
        modifiers: {
          randomValue: [{
            type: 'discrete',
            range: ['test', '1234'],
            key: 'random'
          }]
        }
      }
      const modifier = new ModifierRandomValue(defaultConfig);
      const hit = modifier.addDiscreteValue(defaultHit, config.modifiers.randomValue[0]);
      expect(hit).to.have.property('random');
      expect(config.modifiers.randomValue[0].range).to.contain(hit.random)
    });
  })
});