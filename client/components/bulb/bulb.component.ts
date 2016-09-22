import { Component } from '@angular/core';
import { BulbService } from '../../service/bulb/bulb.service';

@Component({
    selector: 'bulb',
    providers: [BulbService],
    templateUrl: 'client/views/bulb/bulbs.view.html',
})
export class BulbComponent {
    bulbs: Array<any>;

    constructor(_bulbService: BulbService) {
        this.bulbs = _bulbService.getBulbs();
    }
}
