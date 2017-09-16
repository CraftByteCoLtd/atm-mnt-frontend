import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';
import { DispatchTicketService } from '../../_services/dispatch-ticket.service';

import { CurrentUserService } from '../../_services/current-user.service';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dispatch-ticket-detail',
  templateUrl: './dispatch-ticket-detail.component.html',
  styleUrls: ['./dispatch-ticket-detail.component.css']
})
export class DispatchTicketDetailComponent implements OnInit,OnDestroy {
  id:string;
  dt: DispatchTicket;
  dtsSubscription:Subscription;
  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dtService: DispatchTicketService,
    private currentUserService: CurrentUserService,

  ) {
    this.dt = new DispatchTicket();
  }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.dtsSubscription = this.dtService.getDispatchTicket(this.id)
          .subscribe(response => {
            this.dt = response;
          },
          error => console.log(error));

      });

    this.currentUser = this.currentUserService.getCurrentUserInfo();


  }

 

  onReveived() {
    alert('TODO:: add the service call to update status')
    // this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  ngOnDestroy(){
    this.dtsSubscription.unsubscribe();
  }
}
