import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThanosSnapDirective } from './thanos-snap.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ThanosSnapDirective],
  exports: [ThanosSnapDirective]
})
export class NgxThanosModule {}
