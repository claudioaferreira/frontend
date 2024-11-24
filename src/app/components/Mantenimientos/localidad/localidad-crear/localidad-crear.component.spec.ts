import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadCrearComponent } from './localidad-crear.component';

describe('LocalidadCrearComponent', () => {
  let component: LocalidadCrearComponent;
  let fixture: ComponentFixture<LocalidadCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalidadCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalidadCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
