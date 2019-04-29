import { Component } from '@angular/core';

@Component({
  selector: 'wellwind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  snap = false;

  starting() {
    console.log('starting');
  }

  ended() {
    console.log('ended');
  }

  rewinded() {
    console.log('rewinded');
  }
}
