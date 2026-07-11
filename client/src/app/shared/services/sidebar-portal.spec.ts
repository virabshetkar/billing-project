import { TestBed } from '@angular/core/testing';

import { SidebarPortal } from './sidebar-portal';

describe('SidebarPortal', () => {
  let service: SidebarPortal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarPortal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
