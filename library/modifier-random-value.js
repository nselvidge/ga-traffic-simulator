'use strict';

/**
 * Modifier to add a random value for one of the options in the hit
 */

const Modifier = require('./modifier.js');

class ModifierRandomValue extends Modifier{
  constructor(config) {
    super(config);
    this.modifierConfig = config.modifiers.randomValue;
    return this;
  }
  /**
   * Modifies the hit to add a random value
   * @param  {[type]} hit [description]
   * @return {[type]}     [description]
   */
  modify(hit) {
    this.modifierConfig.forEach( configItem => {
      if(configItem.type && configItem.type === 'discrete') {
        hit = this.addDiscreteValue(hit, configItem);
      } else {
        hit = this.addRandomNumber(hit, configItem);
      }
    })

    return super.modify(hit);
  }
  /**
   * Adds a random Number between some range
   * @param {Object} hit    
   * @param {Object} config 
   * @returns {Object}
   */
  addRandomNumber(hit, config) {
    const key = config.key;
    const range = config.range || [0, 1];
    let randomValue = Math.random() * (range[1] - range[0]);

    if(config.integerOnly){
      randomValue = Math.floor(randomValue);
    }

    randomValue += range[0];

    hit[key] = randomValue;
    return hit;
  }
  /**
   * Adds a value from a set of discrete values within the range
   * @param {Object} hit    
   * @param {Object} config 
   * @returns {Object}
   */
  addDiscreteValue(hit, config) {
    const key = config.key;
    const range = config.range;
    let randomValue = Math.floor(Math.random() * range.length);
    hit[key] = range[randomValue];
    return hit;
  }
}

module.exports = ModifierRandomValue;