/* eslint-disable no-underscore-dangle */
import {
  getFactor, getProjectedTime, convertElapseTimeTodays
// eslint-disable-next-line import/extensions
} from './util.js';

export default class Impact {
  constructor(input) {
    this._input = input;
    this.init();
  }

  init() {
    this.currentlyInfected = this.getCurrentlyInfected();
    this.infectionsByRequestedTime = this.getInfectionsByRequestedTime();
    this.severeCasesByRequestedTime = this.getSevereCasesByRequestedTime();
    this.hospitalBedsByRequestedTime = this.getHospitalBedsByRequestedTime();
    this.casesForICUByRequestedTime = this.getCasesForICUByRequestedTime();
    this.casesForVentilatorsByRequestedTime = this.getCasesForVentilatorsByRequestedTime();
    this.dollarsInFlight = this.getDollarsInFlight();
  }


  // challenge 1 of 1
  getCurrentlyInfected() {
    return this._input.reportedCases * 10;
  }

  // challenge 1
  getInfectionsByRequestedTime() {
    const timeInDays = convertElapseTimeTodays(this._input.timeToElapse, this._input.periodType);

    const factor = getFactor(timeInDays);
    const projectedTime = getProjectedTime(factor);
    return Math.trunc(this.currentlyInfected * projectedTime);
  }

  // challenge 2 of 1
  getSevereCasesByRequestedTime() {
    return Math.trunc(0.15 * this.infectionsByRequestedTime);
  }


  // challenge 2 of 2
  getHospitalBedsByRequestedTime() {
    const availableBeds = 0.35 * this._input.totalHospitalBeds;
    return Math.trunc(availableBeds - this.severeCasesByRequestedTime);
  }

  // challenge 3 of 1
  getCasesForICUByRequestedTime() {
    return Math.trunc(0.05 * this.infectionsByRequestedTime);
  }

  // challenge 3 of 2
  getCasesForVentilatorsByRequestedTime() {
    return Math.trunc(0.02 * this.infectionsByRequestedTime);
  }

  // challenge 3 of 3
  getDollarsInFlight() {
    const timeInDays = convertElapseTimeTodays(this._input.timeToElapse, this._input.periodType);
    const amount = (this.infectionsByRequestedTime
    * this._input.region.avgDailyIncomePopulation
    * this._input.region.avgDailyIncomeInUSD) / timeInDays;

    return Math.trunc(amount);
  }


  getData() {
    return {
      currentlyInfected: this.currentlyInfected,
      infectionsByRequestedTime: this.infectionsByRequestedTime,
      severeCasesByRequestedTime: this.severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: this.hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: this.casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: this.casesForVentilatorsByRequestedTime,
      dollarsInFlight: this.dollarsInFlight
    };
  }
}
