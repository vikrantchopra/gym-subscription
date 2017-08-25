import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models';
import { GymSubscriptionService } from '../../services/gym-subscription.service';
import { SelectItem } from 'primeng/primeng';
import { UtilService } from '../../services/util.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css'],
  providers: [GymSubscriptionService, UtilService, ConfirmationService]
})
export class GymComponent implements OnInit {

  items: any;
  gymSubscription: Subscription;
  editSubscription: Subscription;
  selectedRecords: any[];

  amount: SelectItem[];
  statusValues: SelectItem[];

  selectedRecord: any;
  displayEmergencyDialog: boolean;
  displayDialog: boolean;

  constructor(private service: GymSubscriptionService, private utilService: UtilService, private confirmationService: ConfirmationService) {
    this.amount = utilService.getAmountValues();
    this.statusValues = utilService.getStatusValues();
  }

  ngOnInit() {
    this.loadSubscriptions();
    this.editSubscription = this.gymSubscription = this.initializeSubscriptions();
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
    this.displayEmergencyDialog = true;
  }

  onDialogHide() {
    this.selectedRecord = null;
  }

  onEditRow(item: any) {
    //this.gymSubscription = this.cloneSubscription(item);
    this.editSubscription = this.cloneSubscription(item);

    this.displayDialog = true;
  }

  cloneSubscription(model: any) {
    //console.log("Name: " + model.Name);

    let sub = {
      id: model.id,
      gymid: model.GymId,
      employeeName: model.Name,
      receipt: model.Receipt,
      amountPaid: model.Amount,
      startDate: model.StartDate,
      // validity: null,
      status: model.Status,
      comments: model.Comments,
      phone: model.Phone,
      contactName: model.Contact,
      contactPhone: model.EmergencyPhone,
      relation: model.Relation,
      doctorName: model.DoctorName,
      doctorPhone: model.DoctorPhone,
      ailments: model.Ailments
    };

    return sub;
  }

  updateSubscription(model: Subscription) {
    this.service.update(model);
    this.displayDialog = false;
    //this.gymSubscription = this.initializeSubscriptions();
    this.editSubscription = this.initializeSubscriptions();
  }

  confirmDeletion(item: any) {
    console.log("Name: " + item.Name);
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete the record?',
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


}
