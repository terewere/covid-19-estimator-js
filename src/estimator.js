/* eslint-disable import/extensions */
import Impact from './impact.js';
import SevereImpact from './severeImpact.js';

const covid19ImpactEstimator = (data) => {
  const impact = new Impact(data).getData();
  const severeImpact = new SevereImpact(data).getData();

  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
