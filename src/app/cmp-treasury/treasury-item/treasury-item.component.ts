import { Component, OnInit, Input } from '@angular/core';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import _ from "lodash";

@Component({
  selector: 'app-treasury-item',
  templateUrl: './treasury-item.component.html',
  styleUrls: ['./treasury-item.component.css']
})
export class TreasuryItemComponent implements OnInit {

@Input() dt: DispatchTicket;
@Input() dtId: string;

sumRemainingBallance = 0;

  constructor() { }

  ngOnInit() {
  	console.log(this.dt);
	this.sumRemainingBallance = _.sumBy(this.dt.dtAtms, 'remainingBefore');
  }
  onWithdraw(){
  	alert('TODO:: added the service call to withdraw')
  }
  
  onRevieved(){
  	alert('TODO:: added the service call to update the closed status')

 }
}
