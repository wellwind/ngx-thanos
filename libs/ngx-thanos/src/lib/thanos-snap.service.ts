import { Injectable } from '@angular/core';
import { thanosRewind, thanosSnap } from '@wellwind/thanos-snap';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThanosSnapService {

  constructor() { }

  snap(target: HTMLElement) {
    return from(thanosSnap(target));
  }

  rewind(target: HTMLElement) {
    return from(thanosRewind(target));
  }
}
