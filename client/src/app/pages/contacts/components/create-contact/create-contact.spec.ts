import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContact } from './create-contact';

describe('CreateContact', () => {
  let component: CreateContact;
  let fixture: ComponentFixture<CreateContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContact],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
