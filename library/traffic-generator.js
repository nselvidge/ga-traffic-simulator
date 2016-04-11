'use strict';
const Modifier = require('./modifier.js');

/**
 * Generates hits to be sent to Google Analytics
 */
class TrafficGenerator{
  /**
   * Initializes the RTG
   * @param  {Object} config      configures the hits
   * @param  {Array}  modifiers   modifiers change the hits to simulate whatever types of traffic is necessary
   */
  constructor(config, modifiers) {
    modifiers = modifiers || [];
    if(!config || typeof config !== 'object' || !Array.isArray(modifiers)){
      throw new Error('Invalid inputs.');
    }
    this.defaultHit = {
      dh: config.host,
      dt: config.title,
      dp: config.path
    };

    // Ensure there is always at least one modifier
    modifiers.push(new Modifier(config));
    this.modifiers = modifiers;
    return this;
  }
  /**
   * Adds a modifier that will be used when generating hits
   * @param {Modifier<Object>} modifier 
   */
  addModifier(modifier) {
    this.modifiers.push(modifier);
  }
  /**
   * Generates the numberOfHits requested, modifying each based on the modifiers set. 
   * @param  {Number} numberofHits 
   * @return {Array}                Array of hits
   */
  generate(numberofHits) {
    if(typeof numberofHits !== 'number'){
      throw new Error('Invalid value for count');
    }
    let hits = [];
    const self = this;

    for(let i = 0; i < numberofHits; i++){

      let modifiedHit = self.modifiers.reduce((prev, curr, index) => {
        return self.modifiers[index].modify(prev);
      }, self.defaultHit);

      hits.push(modifiedHit);
    }
    return hits;
  }
}

module.exports = TrafficGenerator;