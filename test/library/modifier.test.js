'use strict';

const expect = require('chai').expect;
const Modifier = require('../../library/modifier.js');

describe('Modifier', () => {
  describe('#constructor', () => {
    it('Should return an instance of Modifier', () => {
      const modifier = new Modifier({});
      expect(modifier).to.be.an.instanceof(Modifier);
    });
  });
  describe('#modify', () => {
    it('Should return the given hit without changes', () => {
      const testHit = {
        myKey: 'myValue'
      };
      const modifier = new Modifier({});
      const modifiedHit = modifier.modify(testHit);
      expect(modifiedHit).to.deep.equal(testHit);
    });
  })
})