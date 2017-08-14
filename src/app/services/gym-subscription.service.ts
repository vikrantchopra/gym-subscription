import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import { Subscription } from '../models';

const MONTHLY_AMOUNT: Number = 1000;
const QUARTERLY_AMOUNT: Number = 2700;

@Injectable()
export class GymSubscriptionService {

  subscriptionType: string;

  table = this.horizon.table("subscription");
  constructor(private horizon: HorizonService) { }

  getSubscriptions() {
    return this.table
      .order('StartDate', 'descending')
      .watch();
  }

  refreshStatus() {
    
    //this.table.findAll({Type: 'Monthly'}).fetch().subscribe(msg => console.log(msg));

    //this.table.below({ StartDate: new Date('08-08-2017') }).fetch().subscribe(msg => console.log(msg));

    var rec;
    //this.table.find({Email: 'vikrant.chopra@kofax.com'}).fetch().subscribe(result => rec = result);
    /*this.table.find({ Email: 'vikrant.chopra@kofax.com' }).fetch().subscribe(result => { rec = result;
      this.table.update({
        id: rec.id,
        Status: "INACTIVE"
      });
    });*/

    this.table.below({ StartDate: new Date('08-08-2017') }).fetch().subscribe(result => {
      rec = result;
      rec.forEach(element => {
        this.table.update({
          id: element.id,
          Status: "INACTIVE"
        });
      });
    });
    
  }

  save(model: Subscription) {
    this.table.store({
      GymId: model.gymid,
      Name: model.employeeName,
      Receipt: model.receipt,
      Amount: model.amountPaid,
      StartDate: model.startDate,
      Validity: this.validity(model.amountPaid, model.startDate),
      //Validity: model.startDate,
      Email: this.formEmail(model.employeeName),
      Status: "ACTIVE",
      Comments: model.comments,

      Type: this.getSubscriptionType(model.amountPaid)
    });

  }

  validity(amount: Number, startDate: Date) {

    let month = (amount === MONTHLY_AMOUNT) ? startDate.getMonth() + 1 : startDate.getMonth() + 3;
    let year = startDate.getFullYear();

    return new Date(year, month, 0);
  }

  getSubscriptionType(amount: Number) {
    return this.subscriptionType = (amount === MONTHLY_AMOUNT) ? "Monthly" : "Quarterly";
  }

  formEmail(name: string) {
    return name.toLowerCase().replace(" ", ".") + "@kofax.com";
  }

  status(validity: Date) {
    let today = new Date();

    if (today > validity) {
      return "INACTIVE"
    }

    return "ACTIVE";
  }


}