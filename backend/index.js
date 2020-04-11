/* eslint-disable no-console */

import express from 'express';
import xmlparser from 'express-xml-bodyparser';
import xml from 'xml2js';
import estimator from '../src/estimator';
import logger from './middlewares/logger';
import xmlType from './middlewares/xml-type';

const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

const port = process.env.port || 3000;
app.disable('x-powered-by');
app.set('port', port);
app.use(express.static('src'));

const builder = new xml.Builder({
  renderOpts: { pretty: false }
});


const xmlOptions = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true
};

app.get('/api/v1/on-covid-19/logs', (request, response) => {
  fs.readFile('request_logs.txt', 'utf8', (err, data) => {
    if (err) throw err;
    return response.format({
      'text/plain': () => {
        response.status(200).send(data);
      }
    });
  });
});
app.get('/covid', (request, response) => {
  response.send('salaam');
});

app.get('/api/v1/on-covid-19/', (request, response) => {
  response.json({ data: 'welcome' });
});


app.post('/api/v1/on-covid-19/:type?', xmlType, xmlparser(xmlOptions), (request, response) => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    population, totalHospitalBeds
  } = (request.body);

  console.log(request.body);

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

  if (request.app.isXml) {
    return response.format({
      'application/xml': () => {
        response.status(200).send(builder.buildObject({ estimator: output }));
      }
    });
  }
  return response.format({
    'application/json': () => {
      response.status(200).json(output);
    }
  });
});


app.listen(port, () => console.log('App is running'));
