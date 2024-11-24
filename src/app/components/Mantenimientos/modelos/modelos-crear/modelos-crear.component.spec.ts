import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosCrearComponent } from './modelos-crear.component';

describe('ModelosCrearComponent', () => {
  let component: ModelosCrearComponent;
  let fixture: ComponentFixture<ModelosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelosCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
