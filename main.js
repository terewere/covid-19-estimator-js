// eslint-disable-next-line import/extensions
import estimator from './src/estimator.js';


document.querySelector('[data-go-estimate]').addEventListener('click', (e) => {
  // Prevent actual submit
  e.preventDefault();

  const population = document.querySelector('[data-population]').value;
  const reportedCases = document.querySelector('[data-reported-cases]').value;
  const totalHospitalBeds = document.querySelector('[data-total-hospital-beds]').value;
  const periodType = document.querySelector('[data-period-type]').value;
  const timeToElapse = document.querySelector('[data-time-to-elapse]').value;

  const input = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  const output = estimator(input);

  console.log(output);
});
