import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import _ from "lodash";
import { AuthenticationService } from '../../_services/authentication.service';
import { AtmService } from '../../_services/atm.service';
import { AppConfigService } from '../../_services/app-config.service';

import { CurrentUserService } from '../../_services/current-user.service';
import { Atm } from '../../_models/atm.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-atm-start-page',
  templateUrl: './atm-start-page.component.html',
  styleUrls: ['./atm-start-page.component.css']
})
export class AtmStartPageComponent implements OnInit {

  atms: Atm[];
  sumBalance = 0;
  sumOffline = 0;
  sumOnline = 0;
  atmsSubscription: Subscription;
  subjectSubscription: Subscription;
  currentUser: any;

  lat: number = 39.90183534416827;
  lng: number = -101.11713409423828;
  zoom: number = 5;
  markItem: marker;
  markers: marker[] = []
  selectedCoord: any;


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
               this.genMap(atms);
               this.sumData();

        }
      );

     this.atms = this.atmService.getListAtm();
     this.currentUser = this.currentUserService.getCurrentUserInfo();

  }
  genMap(atms) {
    if (atms) {
      this.markers.length = 0;
      _.forEach(atms, (atm: Atm) => {

        this.lat = +atm.atmLocation.lat;
        this.lng = +atm.atmLocation.lng;
        this.markers.push(
          {
            name: atm.atmMachineID,
            balance: +atm.atmBalance,
            desc: atm.atmNote,
            status: atm.atmStatus,
            lat: +atm.atmLocation.lat,
            lng: +atm.atmLocation.lng,
            draggable: false
          }
        );
      })
    }

  }
  getAtmsByStatus(status: String){
    if (status === "all") {
     this.genMap(this.atms)
    }else{
    let atmResult =  _.filter(this.atms,{ 'atmStatus': status });
     this.genMap(atmResult);
   }
  }

  sumData(){
    this.sumBalance = _.sumBy(this.atms, 'atmBalance');

  }
}
interface marker {
  name?: string,
  balance?: number,
  desc: string,
  lat: number,
  lng: number,
  draggable: boolean,
  status: string
}