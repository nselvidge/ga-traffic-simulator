'use strict';

const ModifierLoader = require('../../library/modifier-loader.js');
const Modifier = require('../../library/modifier.js');
const ModifierRandomValue = require('../../library/modifier-random-value.js');
const expect = require('chai').expect;
const defaultConfig = require('../mocks/config-require');

describe('ModifierLoader', () => {
  describe('#constructor', () => {
    it('Should return an instance of ModifierLoader', () => {
      const modifierLoader = new ModifierLoader(defaultConfig);
      expect(modifierLoader).to.be.an.instanceof(ModifierLoader);
      expect(modifierLoader.modifiers[0]).to.be.an.instanceof(Modifier);
    });
  });
  describe('#getModifiers', () => {
    it('Should return the the correct modifier when provided', () => {
      const modifierLoader = new ModifierLoader(defaultConfig);
      const modifiers = modifierLoader.getModifiers();
      expect(modifiers[0]).to.be.an.instanceof(ModifierRandomValue);
    })
  })
})