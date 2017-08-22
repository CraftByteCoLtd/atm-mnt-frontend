import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';
import { TechnicianTicketService } from '../../_services/technician-ticket.service';


import { TechnicianTicket } from '../../_models/technician-ticket.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-technician-ticket-list',
  templateUrl: './technician-ticket-list.component.html',
  styleUrls: ['./technician-ticket-list.component.css']
})
export class TechnicianTicketListComponent implements OnInit {
  tts: TechnicianTicket[];
  ttsSubscription: Subscription;
  subjectSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private ttService: TechnicianTicketService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.ttsSubscription = this.ttService.getTechnicianTickets()
     .subscribe(
       (tts: TechnicianTicket[]) => {
         this.tts = tts;
         this.ttService.setListTechnicianTicket(tts);
       }
     );

     this.ttsSubscription = this.ttService.technicianTicketChanged
      .subscribe(
        (tts: TechnicianTicket[]) => {
          this.tts = tts;
        }
      );

     this.tts = this.ttService.getListTechnicianTicket();
  }

}
