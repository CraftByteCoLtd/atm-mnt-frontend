import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';


import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dispatch-ticket-detail',
  templateUrl: './dispatch-ticket-detail.component.html',
  styleUrls: ['./dispatch-ticket-detail.component.css']
})
export class DispatchTicketDetailComponent implements OnInit {
  id:string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
      });
  }

}
