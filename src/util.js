const getFactor = ((days) => Math.trunc(days / 3));

const getProjectedTime = ((factor) => 2 ** factor);

const convertElapseTimeTodays = ((timeToElapse, periodType) => {
  if (periodType === 'days') {
    return timeToElapse;
  } if (periodType === 'weeks') {
    return timeToElapse * 7;
  } if (periodType === 'months') {
    return timeToElapse * 30;
  }
  return 'period types include days,weeks and months';
});

const formatMoney = ((value) => {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(value); /* $2,500.00 */
});

export {
  getFactor,
  getProjectedTime,
  convertElapseTimeTodays,
  formatMoney
};
