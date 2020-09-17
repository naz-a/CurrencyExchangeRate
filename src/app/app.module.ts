import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatetimeStringPipeModule } from './pipes/datetime-string.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, DatetimeStringPipeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
