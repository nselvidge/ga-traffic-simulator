'use strict';

class Modifier {
  constructor(config) {
    this.config = config;
    return this;
  }
  modify(hit) {
    return hit;
  }
}

module.exports = Modifier;