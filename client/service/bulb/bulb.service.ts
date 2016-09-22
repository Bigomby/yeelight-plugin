import { Injectable } from '@angular/core';

@Injectable()
export class BulbService {
  bulbs:Array<any>;

  constructor() {
    // this.bulbs = [
    // {
    //   name: 'Living room',
    //   model: 'color',
    //   fwVersion: '1.6.4',
    //   ipAddress: '192.168.1.169',
    //   power: 'on',
    //   brightness: 85,
    //   colorMode: 'Color',
    //   colorRGB: '#121212',
    // },
    // {
    //   name: 'Bedroom 1',
    //   model: 'mono',
    //   fwVersion: '1.7.4',
    //   ipAddress: '192.168.1.171',
    //   power: 'off',
    // },
    // {
    //   name: 'Bedroom 2',
    //   model: 'color',
    //   fwVersion: '1.6.4',
    //   ipAddress: '192.168.1.170',
    //   power: 'on',
    //   brightness: 100,
    //   colorMode: 'Hue',
    //   colorSat: '75',
    // },
    // {
    //   name: 'Kitchen',
    //   model: 'mono',
    //   fwVersion: '1.7.4',
    // },
    // ];
  }

  getBulbs() {
    return this.bulbs;
  }
}
