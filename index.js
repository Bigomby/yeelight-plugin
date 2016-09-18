#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('commander');
const winston = require('winston');
const request = require('request');

const Yeelight = require('./src/yeelight');

// Parse command-line args
cmd.version('0.0.1')
  .option('-p, --port <n>', 'Port to start the HTTP server', parseInt)
  .parse(process.argv);

// Initialize application stuff
const logger = new (winston.Logger)({
  transports: [new (winston.transports.Console)({
    level: 'debug',
    colorize: true,
    prettyPrint: true,
  })],
});
const yeelight = new Yeelight(logger);
const port = cmd.port || 4000;
const app = express();
const server = app.listen(port);

// Set the middleware
app.use(bodyParser.json());

// Listen for new bulbs announcements and send the info to NETBEAST API
yeelight.on('new', (bulb) => {
  request.post({
    url: `http://${process.env.NETBEAST}/api/resources`,
    json: {
      app: 'yeelight-plugin',
      location: 'none',
      topic: 'lights',
      groupname: 'none',
      hook: `/bulb/${bulb.id}`,
    },
  }, (err) => {
    if (err) throw err;
  });
});

// Discover every bulb on network
yeelight.discover();

// API endpoint to handle discover events
app.post('/discover', (req, res) => {
  yeelight.discover();
  res.end();
});


// Handle single bulb status changes
app.post('/bulb/:device_id', (req, res) => {
  let status;

  if (req.body.power) {
    status = 'on';
  } else {
    status = 'off';
  }

  yeelight.setStatus(req.params.device_id, status);
  res.end();
});

// Server start callback
server.on('listening', () => {
  logger.info(`Yeelight plugin started on \
${server.address().address}:${server.address().port}`);
});
