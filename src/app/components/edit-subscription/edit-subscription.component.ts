import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models';
import { GymSubscriptionService } from '../../services/gym-subscription.service';
import { SelectItem } from 'primeng/primeng';
import { UtilService } from '../../services/util.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css'],
  providers: [GymSubscriptionService, UtilService, ConfirmationService]
})
export class EditSubscriptionComponent implements OnInit {

  items: any;
  gymSubscription: Subscription;
  amount: SelectItem[];
  statusValues: SelectItem[];

  selectedRecord: any;
  displayDialog: boolean;

  constructor(private service: GymSubscriptionService, private utilService: UtilService, private confirmationService: ConfirmationService) {
    this.amount = utilService.getAmountValues();
    this.statusValues = utilService.getStatusValues();
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

  editSubscription(item: any) {
    this.selectedRecord = item;
    //console.log("GYM ID: " + emergencyDetails.GymId);
    this.displayDialog = true;
  }

  confirmDeletion(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.deleteRecord(item);
      },
      reject: () => {
        console.log("Deletion Rejected");
      }
    });
  }

  deleteRecord(details: any) {
    this.service.delete(details);
  }

  onDialogHide() {
    this.selectedRecord = null;
  }

}
