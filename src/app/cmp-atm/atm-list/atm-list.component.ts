import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AtmService } from '../../_services/atm.service';
import { AppConfigService } from '../../_services/app-config.service';

import { CurrentUserService } from '../../_services/current-user.service';
import { Atm } from '../../_models/atm.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-atm-list',
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.css']
})
export class AtmListComponent implements OnInit {
  atms: Atm[];
  atmsSubscription: Subscription;
  subjectSubscription: Subscription;
  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private atmService: AtmService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,

  ) { }

  ngOnInit() {
    this.atmsSubscription = this.atmService.getAtms()
     .subscribe(
       (atms: Atm[]) => {
         this.atms = atms;
         this.atmService.setListAtm(atms);
       }
     );

     this.atmsSubscription = this.atmService.atmChange
      .subscribe(
        (atms: Atm[]) => {
          this.atms = atms;
        }
      );

     this.atms = this.atmService.getListAtm();
     this.currentUser = this.currentUserService.getCurrentUserInfo();

  }
  ngOnDestroy(){
    this.atmsSubscription.unsubscribe();
  }

  onAddAtm() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
