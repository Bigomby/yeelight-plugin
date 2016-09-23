import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class BulbService {
    bulbs;

    constructor() {
        this.bulbs = []
        var socket = io.connect();

        socket.on('status', (updatedBulb) => {
            let found;
            for (const [index, bulb] of this.bulbs.entries()) {
                if (updatedBulb.id === bulb.id) {
                    found = true;
                    this.bulbs[index] = updatedBulb;
                }
            }

            if (!found) {
                this.bulbs.push(updatedBulb);
            }
        });
    }

    getBulbs() {
        return this.bulbs;
    }
}
