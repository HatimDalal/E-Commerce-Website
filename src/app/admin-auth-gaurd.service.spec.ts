import { TestBed } from '@angular/core/testing';

import { AdminAuthGaurd } from './admin-auth-gaurd.service';

describe('AdminAuthGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthGaurd = TestBed.get(AdminAuthGaurd);
    expect(service).toBeTruthy();
  });
});
