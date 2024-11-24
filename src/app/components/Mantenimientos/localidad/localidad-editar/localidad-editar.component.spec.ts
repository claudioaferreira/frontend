import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadEditarComponent } from './localidad-editar.component';

describe('LocalidadEditarComponent', () => {
  let component: LocalidadEditarComponent;
  let fixture: ComponentFixture<LocalidadEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalidadEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalidadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
