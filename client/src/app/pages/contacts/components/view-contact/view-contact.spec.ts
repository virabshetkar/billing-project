import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContact } from './view-contact';

describe('ViewContact', () => {
  let component: ViewContact;
  let fixture: ComponentFixture<ViewContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContact],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
