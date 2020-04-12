
// eslint-disable-next-line import/extensions
import Impact from '../src/impact.js';

const assert = require('assert');

const stubValue = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 100,
  population: 66622705,
  totalHospitalBeds: 1380614
};

describe('An impact', () => {
  describe('getCurrentlyInfected', () => {
    it('should return a 1000. i.e. reportedCases x 10', () => {
      const impact = new Impact(stubValue);
      impact.getCurrentlyInfected();
      assert.equal(1000, impact.getCurrentlyInfected());
    });
  });
});

describe('An impact', () => {
  describe('getInfectionsByRequestedTime', () => {
    it('should return a 524288000.', () => {
      const impact = new Impact(stubValue);
      impact.getInfectionsByRequestedTime();
      assert.equal(524288000, impact.getInfectionsByRequestedTime());
    });
  });
});
