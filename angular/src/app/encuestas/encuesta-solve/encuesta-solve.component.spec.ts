import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaSolveComponent } from './encuesta-solve.component';

describe('EncuestaSolveComponent', () => {
  let component: EncuestaSolveComponent;
  let fixture: ComponentFixture<EncuestaSolveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaSolveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
