# NgxThanos

Use [Thanos](https://www.google.com/search?q=Thanos) snap to destory your DOM elements on Angular.

# Installation

```shell
npm install @wellwind/ngx-thanos

or

yarn add @wellwind/ngx-thanos
```

# Usage

Add `NgxThanosModule` to AppModule

```typescript
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
```

Add `ngxThanosSnap` directive to template

```html
<div [ngxThanosSnap]="snap" #thanos="ngxThanosSnap" (snapStarting)="starting()" (snapEnded)="ended()" (rewinded)="rewinded()">
  <h1>Thanos</h1>
  <div>
    Thanos is a fictional supervillain appearing in American comic books
    published by Marvel Comics. The character, created by writer/artist Jim
    Starlin, first appeared in The Invincible Iron Man #55 (cover dated February
    1973). Thanos is one of the most powerful villains in the Marvel Universe
    and has clashed with many heroes including the Avengers, the Guardians of
    the Galaxy, the Fantastic Four, and the X-Men.
  </div>
</div>

<button (click)="snap = !snap" [disabled]="canRewind">Snap</button>
<button (click)="thanos.rewind()" [disabled]="!canRewind">Rewind</button>
```

Or use `ThanosSnapService` to manipulate DOM directly.

```typescript
export class AppComponent implements OnInit {

  @ViewChild('thanosElement') thanosElement: ElementRef;
  snap = false;
  canRewind = false;

  constructor(private thanosSnapService: ThanosSnapService) {
  }

  ngOnInit() {
    // destroy the element, and rewind it after 3s.
    this.thanosSnapService.snap(this.thanosElement.nativeElement).subscribe(() => {
      setTimeout(() => {
        this.thanosSnapService.rewind(this.thanosElement.nativeElement);
      }, 3000);
    });
  }
```

# Use pure javascript

There is also a pure javascript library called [@wellwind/thanos-snap](https://github.com/wellwind/ngx-thanos/tree/master/libs/thanos-snap). Then you don't have to rely on Angular.
