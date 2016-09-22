import { Component } from "@angular/core";

import { BulbComponent } from './components/bulb/bulb.component';
import { BulbService } from './service/bulb/bulb.service';

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <div align="center">
        <h1>{{title}}</h1>
      </div>
      <bulb></bulb>
    </div>
  `
})

export class AppComponent {
  title: string = 'Yeelight devices';
}
