import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AtmService } from '../../_services/atm.service';
import { AppConfigService } from '../../_services/app-config.service';

import { CurrentUserService } from '../../_services/current-user.service';
import { Atm } from '../../_models/atm.model';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

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
  searchText: string;
  timeOut: any = null;

  constructor(
    private authenticationService: AuthenticationService,
    private atmService: AtmService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,

  ) { }

  ngOnInit() {
    this.searchText = ""

    this.initLoadData();
    this.currentUser = this.currentUserService.getCurrentUserInfo();

  }
  ngOnDestroy() {
    this.atmsSubscription.unsubscribe();
  }

  onAddAtm() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  initLoadData() {
    this.atmsSubscription = this.atmService.getAtms()
      .subscribe(
      (atms: Atm[]) => {
        this.atms = atms;
        this.atmService.setListAtm(this.atms);
      }
      );

    this.atmsSubscription = this.atmService.atmChange
      .subscribe(
      (atms: Atm[]) => {
        this.atms = atms;
      }
      );

    this.atms = this.atmService.getListAtm();
  }

  onSearch() {
    var txt = this.searchText.toLowerCase();

    if (this.searchText.length > 0) {

      this.atmsSubscription = this.atmService.getAtms()
        .subscribe(
        (atms: Atm[]) => {
          this.atms = _.filter(atms, function(obj) { return obj.atmMachineID.toLowerCase().indexOf(txt) !== -1 });
          this.atmService.setListAtm(this.atms);
        }
        );
    } else {
      this.initLoadData();
    }

  }
  onAtmOnMap(){
    this.router.navigate(['/atm/start'], { relativeTo: this.route });
  }

  onChangeSearchText() {
    console.log('changed');
    if (this.timeOut) {
      window.clearTimeout(this.timeOut);
    }

    window.setTimeout(() => {
      this.onSearch();
    }, 1000);
  }

  onClear() {
    this.searchText = "";
    this.onSearch();
  }
}
