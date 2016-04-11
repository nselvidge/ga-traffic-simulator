'use strict';

const ConfigLoader = require('../../library/config-loader.js');
const expect = require('chai').expect;

describe('ConfigLoader', () => {
  describe('Constructor', () => {
    it('Should return an instance of ConfigLoader with a config property', () => {
      const configLoader = new ConfigLoader('test/mocks/config.json');
      expect(configLoader).to.be.an.instanceof(ConfigLoader);
      expect(configLoader.config).to.be.an('object');
    })
  })
})