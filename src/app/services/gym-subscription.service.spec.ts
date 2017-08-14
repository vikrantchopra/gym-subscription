import { TestBed, inject } from '@angular/core/testing';

import { GymSubscriptionService } from './gym-subscription.service';

describe('GymSubscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GymSubscriptionService]
    });
  });

  it('should be created', inject([GymSubscriptionService], (service: GymSubscriptionService) => {
    expect(service).toBeTruthy();
  }));
});
