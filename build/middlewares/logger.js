/* eslint-disable no-console */
import { getActualRequestDurationInMilliseconds } from '../util';

const fs = require('fs');

const logger = (req, res, next) => {
  // GET /api/v1/on-covid-19 200 30 ms
  const { method } = req;
  const { url } = req;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `${method}\t\t${url}\t\t${status}\t\t${durationInMilliseconds.toLocaleString()}\t\tms`;
  // console.log(log);

  fs.appendFile('request_logs.txt', `${log}\n`, err => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

export default logger;
//# sourceMappingURL=logger.js.map