import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoOpcionesComponent } from './mantenimiento-opciones.component';

describe('MantenimientoOpcionesComponent', () => {
  let component: MantenimientoOpcionesComponent;
  let fixture: ComponentFixture<MantenimientoOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoOpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
