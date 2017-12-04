import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';
import { DispatchTicketService } from '../../_services/dispatch-ticket.service';
import  * as _ from "lodash";
import { NgForm } from '@angular/forms';

import { CurrentUserService } from '../../_services/current-user.service';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { Subscription } from 'rxjs/Subscription';
import { TechnicianTicket} from '../../_models/technician-ticket.model';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-dispatch-ticket-detail',
  templateUrl: './dispatch-ticket-detail.component.html',
  styleUrls: ['./dispatch-ticket-detail.component.css']
})
export class DispatchTicketDetailComponent implements OnInit, OnDestroy {
  id: string;
  dt: DispatchTicket;
  dtsSubscription: Subscription;
  currentUser: any;
  isCompleted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dtService: DispatchTicketService,
    private currentUserService: CurrentUserService,
    private alert: AlertService

  ) {
    this.dt = new DispatchTicket();
  }

  ngOnInit() {
    this.loadInitial();

  }

  loadInitial() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.dtsSubscription = this.dtService.getDispatchTicket(this.id)
          .subscribe(response => {
            this.dt = response;
            this.dtService.setSingleDispatchTicket(this.dt);
          },
          error => console.log(error));

      });
    this.currentUser = this.currentUserService.getCurrentUserInfo();

    // Refresh the parent using service 
    this.dtsSubscription = this.dtService.SingleDispatchChanged
      .subscribe(
      (dt: DispatchTicket) => {
        this.dt = dt;
        this.onDoneAllDeposit();
      }
      );
  }
  onRecieved() {

    let cfResult = confirm('Confirm Recieved Money from Treasury?');
    if (cfResult === false) return;

    const _RECIEVED_STATUS = 'recieved';

    let recievedItem: RecievedItem = {
      id: this.dt._id,
      dtStatus: _RECIEVED_STATUS
    }
    this.refreshListData();

    this.dtsSubscription = this.dtService.doRecievedDispatchTicket(recievedItem)
      .subscribe(data => {
        this.alert.info('The Dispatch Ticket status changed to Recieved.');
        this.loadInitial();
      });
  }

  taskAction(i, status) {
    let cfResult = confirm('Confirm to Change the Task Status?');
    if (cfResult === false) return;

    this.dt.dtManualTasks[i].taskStatus = status;

    this.dtsSubscription = this.dtService.updateDispatchTicket(this.dt)
      .subscribe(data => {
        if (data['success'] === true) {
          this.alert.info('Updated Task Status Successfully')
          this.loadInitial();
        }
      });
  }

  onDoneAllDeposit() {
    var openItem = _.find(this.dt.dtAtms, { dtAtmStatus: "open" })
    this.isCompleted = (openItem === undefined)
  }

  onCompleted() {


    // validate the manualTasks must all completed
    let notCompletedTask =  _.findIndex(this.dt.dtManualTasks,{taskStatus:false});
    if (notCompletedTask > -1 ) {
      this.alert.error('All Manual tasks are required to be completed!');
      return false;
    }

    // validate the Technician Ticket must all completed 
    let notCompletedTT = _.findIndex(this.dt.dtTechnicianTickets,{tTicketStatus:"open"});
    if (notCompletedTT > -1) {
  
      this.alert.error('All Technician Tickets are required to be completed!');
      return false;
     }

    let cfResult = confirm('Confirm as a Completed Dispatch?');
    if (cfResult === false) return;
    let completedItem: CompletedItem = {
      _id: this.id
    }
    this.dtsSubscription = this.dtService.doMarkCompletedDispatchTicket(completedItem)
      .subscribe(data => {
        this.alert.info('Updated Dispatch Status To Completed ');
        this.loadInitial();
        this.refreshListData()
      });
  }

  refreshListData() {
    this.dtsSubscription = this.dtService.getDispatchTickets().subscribe(data => {
      this.dtService.setListDispatchTicket(data);

    })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.dtsSubscription.unsubscribe();
  }

  onTtCompleted(f: NgForm, tt: TechnicianTicket) {
    let cfResult = confirm('Confirm as a Completed Technician Ticket?');
    if (cfResult === false) return;
    let completedTtItem: CompletedTtItem = {
      _id: this.id,
      tt_id: tt.id,
      tTicketID: tt.tTicketID,
      tTicketSolution: f.value.txtResolution
    }
    this.dtsSubscription = this.dtService.doClosedTechicianTicket(completedTtItem)
      .subscribe(data => {
        this.alert.info('The Technician Ticket status changed to Completed.')
         this.loadInitial();
        this.refreshListData()
      });
  }
}

interface RecievedItem {
  id: string;
  dtStatus: string;
} 


interface CompletedItem {
  _id: string
}

interface CompletedTtItem {
  _id: string;
  tt_id: string;
  tTicketID: string;
  tTicketSolution:string;
} 
