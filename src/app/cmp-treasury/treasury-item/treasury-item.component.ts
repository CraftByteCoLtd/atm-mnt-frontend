import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CurrentUserService } from '../../_services/current-user.service';
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

  currentUser: any;
  msg: any;
  sumRemainingBalance = 0;
  sumBadBill = 0;
  sumDeposit = 0;
  sumCurrentBalance = 0;
  sumActualRemaining = 0;
  sumActualBalance = 0;

  dtsSubscription: Subscription;

  constructor(
    private dtService: DispatchTicketService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,

  ) { }

  ngOnInit() {
    this.sumActualRemaining = _.sumBy(this.dt.dtAtms, 'actualRemaining');
    this.sumRemainingBalance = _.sumBy(this.dt.dtAtms, 'remainingBefore');
    this.sumBadBill = _.sumBy(this.dt.dtAtms, "badBill");
    this.sumDeposit = _.sumBy(this.dt.dtAtms, "deposit");
    this.sumCurrentBalance = (this.sumRemainingBalance + this.sumDeposit) - this.sumBadBill;
    this.sumActualBalance = (this.sumActualRemaining + this.sumDeposit) - this.sumBadBill;

    this.currentUser = this.currentUserService.getCurrentUserInfo();

  }


  onWithdraw(f: NgForm) {
    let withdrawItem: WithdrawItem;
    let cfResult = confirm('Confirm to save change?');
    if (cfResult === false) return;

    withdrawItem = {
      id: this.dtId,
      dtWithdrawBalance: f.value.txtWithdrawAmount,
      dtStatus: 'withdraw',
      logType: this.dt.dtID + ' (withdraw) ' + f.value.txtWithdrawAmount,
      updatedBy: this.currentUser.fullName
    }

    this.dtsSubscription = this.dtService.doWithdrawDispatchTicket(withdrawItem)
      .subscribe(data => {
        this.msg = data;
        this.refreshData();
      });
  }


  onRecieved(frmClosed: NgForm) {
    console.log(frmClosed);
    let returnAmount = frmClosed.value.txtReturnAmount;
    let closedItem: ClosedItem;

    if (parseInt(returnAmount) < this.sumBadBill) {
      alert("The Bad bill return cannot be less than " + this.sumBadBill);
      return false;
    }

    let cfResult = confirm('Confirm to save change?');
    if (cfResult === false) return;

    closedItem = {
      id: this.dtId,
      dtReturnBalance: frmClosed.value.txtReturnAmount,
      dtStatus: 'closed',
      logType: this.dt.dtID + ' (bad bill Return) ' + frmClosed.value.txtReturnAmount,
      updatedBy: this.currentUser.fullName
    }

    this.dtsSubscription = this.dtService.doClosedDispatchTicket(closedItem)
      .subscribe(data => {
        this.msg = data;
        this.refreshData();
      });

  }

  refreshData() {
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
  logType: string;
  updatedBy: string;
}

interface ClosedItem {
  id: string;
  dtReturnBalance: Number;
  dtStatus: string;
  logType: string;
  updatedBy: string;
}

