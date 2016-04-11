'use strict';
const fs = require('fs');

/**
 * Loads the Configuration for the simulator
 */
class ConfigLoader {
  constructor(fileLocation) {
    this.config = this.getJSONData(fileLocation);
  }
  getJSONData(fileLocation){
    try {
      const fileData = fs.readFileSync(`${process.cwd()}/${fileLocation}`, 'utf-8');
      return JSON.parse(fileData);
    } catch(e) {
      e.name = 'PARSE_FAILURE';
      e.message = 'Failed to parse config: ' + e.message;
      throw e;
    }
  }
}

module.exports = ConfigLoader;