import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';


import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-dispatch-ticket-list',
  templateUrl: './dispatch-ticket-list.component.html',
  styleUrls: ['./dispatch-ticket-list.component.css']
})
export class DispatchTicketListComponent implements OnInit {

  dts: DispatchTicket[] = [];
  partsSubscription: Subscription;
  subjectSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let dt1 = new DispatchTicket();
    dt1.dtID = "DP-1";
    dt1.id = "MOCK-DP-1";
    dt1._id = "MODK-DP-1";
    dt1.dtStatus="open";
    dt1.updated = new Date("2017-08-21T14:39:12.328Z");
    this.dts.push(dt1);


    let dt2 = new DispatchTicket();
    dt2.dtID = "DP-2";
    dt2.id = "MOCK-DP-2";
    dt2._id = "MOCK-DP-2";
    dt2.dtStatus="open";
    dt2.updated = new Date("2017-08-21T14:39:12.328Z");
    this.dts.push(dt2);
  }

}
