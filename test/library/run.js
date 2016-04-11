'use strict';

const expect = require('chai').expect;
const gaStub = require('nock')('http://www.google-analytics.com');
const sinon = require('sinon');
const defaultConfig = require('../mocks/config-require.js');
const run = require('../../library/run.js');

describe('run', () => {
  it('Should load the provided config and send the given number of hits to GA', () => {
    const collectSpy = sinon.spy();      
    for(let i = 0; i < defaultConfig.hits; i++){
      gaStub.post('/collect').reply(() => {
        collectSpy();
        return [200, {}];
      });
    };
    return run('test/mocks/config.json').then(() => {
      expect(collectSpy.callCount).to.equal(defaultConfig.hits);
    });
  })
})