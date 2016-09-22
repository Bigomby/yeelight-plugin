import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { BulbComponent }  from './components/bulb/bulb.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    BulbComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
