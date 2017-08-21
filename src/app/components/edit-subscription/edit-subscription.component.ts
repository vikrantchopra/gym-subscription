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
  changedStatus: string;

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

  onEditRow(item: any) {//console.log("Name::: " + item.Name);
    this.gymSubscription = this.cloneSubscription(item);
    //console.log("Name Gym Subbbb::: " + this.gymSubscription.employeeName);
    this.displayDialog = true;
  }

  cloneSubscription(model: any) {console.log("Name: " + model.Name);
    
    //var sub1: Subscription = this.initializeSubscriptions();
     /*for(let prop in model) {
        //this.gymSubscription[prop] = item[prop];
        sub1[prop] = model[prop];
        this.gymSubscription[prop] = model[prop];
        console.log("Gym: " + sub1[prop] + " ITEM: " + model[prop]);
       
    }*/
    
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
    //console.log("Name: " + model.Name);
    
    return sub;
  }

  updateSubscription(model: Subscription) {
    this.service.update(model);
    this.displayDialog = false;
  }

  confirmDeletion(item: any) {console.log("Name: " + item.Name);
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

  updateRecord(model: Subscription) {
    this.service.update(model);
    this.displayDialog = false;
    this.initializeSubscriptions();
  }

}
