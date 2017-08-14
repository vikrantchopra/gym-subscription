import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models';
import { GymSubscriptionService } from '../../services/gym-subscription.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css'],
  providers: [GymSubscriptionService]
})
export class GymComponent implements OnInit {

  items: any;
  gymSubscription: Subscription;

  constructor(private service: GymSubscriptionService) { }

  ngOnInit() {this.service.refreshStatus();
    this.loadSubscriptions();
    this.gymSubscription = this.initializeSubscriptions();
  }

  loadSubscriptions() {
    this.items = this.service.getSubscriptions();
  }

  initializeSubscriptions() {
    let sub = {
      gymid: '',
      employeeName: '',
      receipt: '',
      amountPaid: 1000,
      startDate: null,
     // validity: null,
      status: 'ACTIVE',
      comments: ''
    };
    return sub;
  }

  addSubscription(model: Subscription) {
    this.service.save(model);
    this.gymSubscription = this.initializeSubscriptions();
  }

}
