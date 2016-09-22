import { Component } from "@angular/core";

import { BulbComponent } from './components/bulb/bulb.component';
import { BulbService } from './service/bulb/bulb.service';

@Component({
    selector: 'app',
    template: `
    <div class="container">
      <div align="center">
        <h1>Yeelight devices on my network</h1>
      </div>
      <bulb></bulb>
    </div>
  `
})

export class AppComponent { }
