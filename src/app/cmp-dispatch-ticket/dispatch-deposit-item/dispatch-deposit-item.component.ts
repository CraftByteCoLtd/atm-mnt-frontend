import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DispatchTicketService } from '../../_services/dispatch-ticket.service';
import { CurrentUserService } from '../../_services/current-user.service';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-dispatch-deposit-item',
	templateUrl: './dispatch-deposit-item.component.html',
	styleUrls: ['./dispatch-deposit-item.component.css']
})
export class DispatchDepositItemComponent implements OnInit {
	@Input() at: any;
	@Input() dtId: string;
	@Input() currentUser: any;
	@Input() dt: DispatchTicket;

	dtsSubscription: Subscription;
	refModalBox: any;


	txtRemaining: number = 0;
	txtDeposit: number = 0;
	txtBadBill: number = 0;
	txtTotal: number = 0;
	txtActual: number = 0;

	ngOnInit() {
		this.txtRemaining = this.at.remainingBefore;
		this.txtDeposit = this.at.deposit;
		this.txtBadBill = this.at.badBill;
		this.txtTotal = this.at.txtRemaining;
		if (this.at.actualRemaining) {
			this.txtActual = this.at.actualRemaining;
		}else{
			this.txtActual = 0;

		}
		this.calTotal();

	}

	constructor(
		private modalService: NgbModal,
		private dtService: DispatchTicketService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	onDeposit() {

		if (this.txtActual < 1 ) {
			alert('Please fill Actual balance fields!');
			return false;
		}

		let cfResult = confirm('Confirm Recieved Money from Treasury?');
		if (cfResult === false) return;

		const _RECIEVED_STATUS = 'recieved';

		let updateItem: UpdateBalanceItem = {
			_id: this.dtId,
			updateAtm: this.at,
			badBill: this.txtBadBill,
			deposit: this.txtDeposit,
			Total: this.txtTotal,
			updatedBy: this.currentUser.fullName,
			actualRemaining: this.txtActual
		}

		this.dtsSubscription = this.dtService.doUpdateBalanceDispatchTicket(updateItem)
			.subscribe(data => {
				this.refModalBox.close();
				this.onComplete();
			});
	}


	calTotal() {
		this.txtTotal = (this.txtActual - this.txtBadBill) + this.txtDeposit;

	}


	open(content) {
		this.refModalBox = this.modalService.open(content);
	}

	onComplete() {

		this.dtsSubscription = this.dtService.getDispatchTicket(this.dtId)
			.subscribe(response => {
				this.dtService.setSingleDispatchTicket(response);
				this.dt = response;
			},
			error => console.log(error));

	}

}

interface UpdateBalanceItem {
	updateAtm: any;
	_id: string;
	badBill: number;
	deposit: number;
	Total: number;
	updatedBy: string;
	actualRemaining: number;
}

