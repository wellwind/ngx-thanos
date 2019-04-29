import { async, TestBed } from '@angular/core/testing';
import { NgxThanosModule } from './ngx-thanos.module';

describe('NgxThanosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxThanosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxThanosModule).toBeDefined();
  });
});
