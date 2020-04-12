/* eslint-disable no-console */
const fs = require('fs');

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  const mili = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  return (mili / 1000.0).toFixed(2);
};


const demo = (req, res, next) => {
  const currentDatetime = new Date();
  const formattedDate = `${currentDatetime.getFullYear()
  }-${
    currentDatetime.getMonth() + 1
  }-${
    currentDatetime.getDate()
  } ${
    currentDatetime.getHours()
  }:${
    currentDatetime.getMinutes()
  }:${
    currentDatetime.getSeconds()}`;
  const { method } = req;
  const { url } = req;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `[${formattedDate}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;

  fs.appendFile('request_logs.txt', `${log}\n`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

export {
  getActualRequestDurationInMilliseconds,
  demo
};
