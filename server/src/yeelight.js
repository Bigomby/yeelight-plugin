const Client = require('node-ssdp').Client;
const EventEmitter = require('events').EventEmitter;
const net = require('net');

class Yeelight extends EventEmitter {
  constructor(logger) {
    super(); // Call the superclass constructor
    this.bulbs = []; // DB with the discovered bulbs
    this.logger = logger;

    // Create a client for SSDP
    this.client = new Client({
      ssdpPort: 1982, // Yeelight non default SSDP port
    });

    // Listen for SSDP announcements and if it comes from a new bulb, store
    // the info on the DB
    this.client.on('response', (headers, statusCode, rinfo) => {
      const newBulb = {
        id: headers.ID,
        name: headers.NAME,
        model: headers.MODEL,
        fwVersion: headers.FW_VER,
        location: headers.LOCATION,
        support: headers.SUPPORT,
        ipAddress: rinfo.address,
        power: headers.POWER,
        brightness: headers.BRIGHT,
        colorMode: headers.COLOR_MODE,
        colorRGB: headers.RGB,
        colorHue: headers.HUE,
        colorSat: headers.SAT,
      };

      let found = false;
      for (const bulb of this.bulbs) {
        if (bulb.id === newBulb.id) {
          found = true;
          break;
        }
      }

      if (!found) {
        // Add the new bulb to the DB and establish a connection to listen
        // for updates
        this.bulbs.push(newBulb);

        // Force the bulb to send a status message when anything is received
        // on the connection.
        const client = new net.Socket();
        client.on('data', () => { this.client.search('wifi_bulb'); });
        client.connect(55443, newBulb.ipAddress);

        this.emit('new', newBulb);
      } else {
        this.emit('status', newBulb);
      }
    });
  }

  // Requests all the bulbs on the network to send an SSDP announcement
  discover() {
    this.client.search('wifi_bulb');
  }

  // Find a bulb matching the given ID and turn it ON or OFF
  setStatus(id, status) {
    for (const bulb of this.bulbs) {
      if (bulb.id === id) {
        const client = new net.Socket();
        const request = `{"id": "${bulb.id}", "method": "set_power", "params":["${status}", "smooth", 500]}\r\n`;

        // TODO Reuse the connection already established since the bulb
        // has a connection limit
        client.connect(55443, bulb.address, () => {
          client.write(request);
        });

        client.on('data', (res) => {
          const data = JSON.parse(res);
          if (data.error) {
            this.logger.error(data.error);
          }

          client.destroy();
        });

        break;
      }
    }
  }
}

module.exports = Yeelight;
