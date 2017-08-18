import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models';
import { GymSubscriptionService } from '../../services/gym-subscription.service';
import { SelectItem } from 'primeng/primeng';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css'],
  providers: [GymSubscriptionService, UtilService]
})
export class GymComponent implements OnInit {

  items: any;
  gymSubscription: Subscription;
  selectedRecords: any[];

  amount: SelectItem[];

  selectedRecord: any;
  displayDialog: boolean;

  constructor(private service: GymSubscriptionService, private utilService: UtilService) {
    this.amount = utilService.getAmountValues();
  }

  ngOnInit() {
    this.loadSubscriptions();
    this.gymSubscription = this.initializeSubscriptions();
  }

  loadSubscriptions() {
    this.items = this.service.getSubscriptions();
  }

  refreshStatus() {
    this.service.refreshStatus();
  }

  initializeSubscriptions() {
    let sub = {
      id: '',
      gymid: '',
      employeeName: '',
      receipt: '',
      amountPaid: 1000,
      startDate: null,
      // validity: null,
      status: 'ACTIVE',
      comments: '',
      phone: '',
      contactName: '',
      contactPhone: '',
      relation: '',
      doctorName: '',
      doctorPhone: '',
      ailments: ''
    };
    return sub;
  }

  addSubscription(model: Subscription) {
    this.service.save(model);
    this.gymSubscription = this.initializeSubscriptions();
  }

  
  selectEmergencyDetails(emergencyDetails: any) {
    this.selectedRecord = emergencyDetails;
    //console.log("GYM ID: " + emergencyDetails.GymId);
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedRecord = null;
  }
  

}
