import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxThanosModule } from '@wellwind/ngx-thanos';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxThanosModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
