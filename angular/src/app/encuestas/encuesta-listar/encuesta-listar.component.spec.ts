import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaListarComponent } from './encuesta-listar.component';

describe('EncuestaListarComponent', () => {
  let component: EncuestaListarComponent;
  let fixture: ComponentFixture<EncuestaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
