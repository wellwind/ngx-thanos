import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ThanosSnapService } from './thanos-snap.service';

@Directive({
  selector: '[ngxThanosSnap]',
  exportAs: 'ngxThanosSnap'
})
export class ThanosSnapDirective implements OnChanges {

  @Input() ngxThanosSnap = false;

  @Output() snapStarting = new EventEmitter<void>();
  @Output() snapEnded = new EventEmitter<void>();
  @Output() rewinded = new EventEmitter<void>();

  get host(): HTMLElement {
    return this.elementRef.nativeElement
  }

  constructor(private elementRef: ElementRef, private thanosSnapService: ThanosSnapService) { }

  ngOnChanges() {
    if (this.ngxThanosSnap) {
      this.snap();
    } else {
      this.rewind()
    }
  }

  snap() {
    this.snapStarting.emit();
    this.thanosSnapService.snap(this.host).subscribe(() => this.snapEnded.emit());
  }

  rewind() {
    this.thanosSnapService.rewind(this.host).subscribe(() => this.rewinded.emit());
  }
}
