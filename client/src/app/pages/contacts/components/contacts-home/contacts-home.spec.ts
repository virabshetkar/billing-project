import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsHome } from './contacts-home';

describe('ContactsHome', () => {
  let component: ContactsHome;
  let fixture: ComponentFixture<ContactsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
