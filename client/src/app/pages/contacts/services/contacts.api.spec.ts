import { TestBed } from '@angular/core/testing';

import { ContactsApi } from './contacts.api';

describe('ContactsApi', () => {
  let service: ContactsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
