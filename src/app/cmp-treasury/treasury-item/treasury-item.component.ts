import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { DispatchTicketService } from '../../_services/dispatch-ticket.service';
import _ from "lodash";

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-treasury-item',
  templateUrl: './treasury-item.component.html',
  styleUrls: ['./treasury-item.component.css']
})
export class TreasuryItemComponent implements OnInit {

@Input() dt: DispatchTicket;
@Input() dtId: string;

msg:any;
sumRemainingBalance = 0;
dtsSubscription: Subscription;

  constructor(
    private dtService : DispatchTicketService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
  	console.log(this.dt);
	this.sumRemainingBalance = _.sumBy(this.dt.dtAtms, 'remainingBefore');
  }


  onWithdraw(f:NgForm) {
      let withdrawItem:WithdrawItem;
      let cfResult  = confirm('Confirm to save change?');
      if (cfResult === false) return;
      console.log(f.value)

      withdrawItem = {
        id : this.dtId,
        dtWithdrawBalance : f.value.txtWithdrawAmount,
        dtStatus: 'withdraw'
      }
      
      this.dtsSubscription = this.dtService.doWithdrawDispatchTicket(withdrawItem)
            .subscribe(data=> {
              this.msg = data;
              console.log(data);
              this.refreshData();
            });
      }

  onRecieved(){
  	alert('TODO:: added the service call to update the closed status')
  }

    refreshData(){
      this.dtsSubscription = this.dtService.getActiveDispatchTickets()
     .subscribe(
       (dts: DispatchTicket[]) => {
         this.dtService.setListDispatchTicket(dts);
       }
     );
    }

}
interface WithdrawItem {
  id: string;
  dtWithdrawBalance: Number;
  dtStatus: string;
}
