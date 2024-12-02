import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReparacionComponent } from './agregar-reparacion.component';

describe('AgregarReparacionComponent', () => {
  let component: AgregarReparacionComponent;
  let fixture: ComponentFixture<AgregarReparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarReparacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
