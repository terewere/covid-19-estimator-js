// eslint-disable-next-line import/extensions
import { getFactor, getProjectedTime } from '../src/util.js';

const assert = require('assert');

it('should return true', () => {
  assert.equal(true, true);
});

it('correctly return the factor 3 in 30 days', () => {
  assert.equal(getFactor(30), 10);
});

it('correctly return the the projected time given the factor', () => {
  assert.equal(getProjectedTime(9), 512);
});
