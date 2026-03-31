import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firstGuard } from './first.guard';

describe('firstGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
