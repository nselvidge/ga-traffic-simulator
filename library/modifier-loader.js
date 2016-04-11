'use strict';

/**
 * Loads all modifiers based on the current configuration
 */


const defaultDictionary = {
  randomValue: './modifier-random-value.js',
}

class ModifierLoader {
  constructor(config, modifierDictionary){
    modifierDictionary = modifierDictionary || defaultDictionary;
    this.config = config;
    this.modifierConfig = config.modifiers;
    this.modifierDictionary = modifierDictionary;
    this.modifiers = this.getModifiers();

    return this;
  }
  /**
   * Instantiates the modifiers
   * @return {Array} 
   */
  getModifiers() {
    const self = this;
    const modifiers = [];
    for (let modifierName in self.modifierConfig){
      const modifierPath = this.modifierDictionary[modifierName];
      const Modifier = require(modifierPath);
      const modifier = new Modifier(self.config);
      modifiers.push(modifier);
    }

    return modifiers
  }
}

module.exports = ModifierLoader;