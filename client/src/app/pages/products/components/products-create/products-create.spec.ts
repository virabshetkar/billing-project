import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCreate } from './products-create';

describe('ProductsCreate', () => {
  let component: ProductsCreate;
  let fixture: ComponentFixture<ProductsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
