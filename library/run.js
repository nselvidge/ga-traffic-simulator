'use strict';

const ConfigLoader = require('./config-loader.js');
const TrafficGenerator = require('./traffic-generator.js');
const TrafficSender = require('./traffic-sender.js');
const ModifierLoader = require('./modifier-loader.js');

function run(configPath) {
  const config = (new ConfigLoader(configPath)).config;
  const modifiers = (new ModifierLoader(config)).modifiers;
  const hits = (new TrafficGenerator(config, modifiers)).generate(config.hits);
  const sendPromise = (new TrafficSender(config.trackingId)).send(hits);

  return sendPromise.then((result) => {
    console.log(`${result.length} hits successfully sent`);
  }).catch(function(err){
    console.error('There was a problem sending the hits: ', err.message);
  })
}

module.exports = run;