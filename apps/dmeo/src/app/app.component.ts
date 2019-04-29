import { Component } from '@angular/core';

@Component({
  selector: 'wellwind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  snap = false;
  canRewind = false;

  starting() {
    this.canRewind = false;
    console.log('starting');
  }

  ended() {
    this.canRewind = true;
    console.log('ended');
  }

  rewinded() {
    console.log('rewinded');
  }
}
