// eslint-disable-next-line import/extensions
import Impact from './impact.js';

export default class SevereImpact extends Impact {
  // eslint-disable-next-line no-useless-constructor
  constructor(input) {
    super(input);
  }

  // challenge 1
  getCurrentlyInfected() {
    // eslint-disable-next-line no-underscore-dangle
    return this._input.reportedCases * 50;
  }
}
