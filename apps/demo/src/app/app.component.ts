import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThanosSnapService } from '../../../../libs/ngx-thanos/src/lib/thanos-snap.service';

@Component({
  selector: 'wellwind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('thanosElement') thanosElement: ElementRef;
  snap = false;
  canRewind = false;

  constructor(private thanosSnapService: ThanosSnapService) {
  }

  ngOnInit() {
    this.thanosSnapService.snap(this.thanosElement.nativeElement).subscribe(() => {
      setTimeout(() => {
        this.thanosSnapService.rewind(this.thanosElement.nativeElement);
      });
    });
  }

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
