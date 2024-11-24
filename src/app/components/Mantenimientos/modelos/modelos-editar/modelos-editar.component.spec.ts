import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosEditarComponent } from './modelos-editar.component';

describe('ModelosEditarComponent', () => {
  let component: ModelosEditarComponent;
  let fixture: ComponentFixture<ModelosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelosEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
