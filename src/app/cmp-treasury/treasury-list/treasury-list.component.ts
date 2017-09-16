import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';
import { DispatchTicketService } from '../../_services/dispatch-ticket.service';

import { CurrentUserService } from '../../_services/current-user.service';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-treasury-list',
  templateUrl: './treasury-list.component.html',
  styleUrls: ['./treasury-list.component.css']
})
export class TreasuryListComponent implements OnInit {
  dts: DispatchTicket[] = [];
  dtsSubscription: Subscription;
  subjectSubscription: Subscription;
  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private dtService: DispatchTicketService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,
  	) { }

 ngOnInit() {
    this.dtsSubscription = this.dtService.getActiveDispatchTickets()
     .subscribe(
       (dts: DispatchTicket[]) => {
         this.dts = dts;
         this.dtService.setListDispatchTicket(dts);
       }
     );

     this.dtsSubscription = this.dtService.DispatchTicketChanged
      .subscribe(
        (dts: DispatchTicket[]) => {
          this.dts = dts;
        }
      );

     this.dts = this.dtService.getListDispatchTicket();
     this.currentUser = this.currentUserService.getCurrentUserInfo();

  }

}
