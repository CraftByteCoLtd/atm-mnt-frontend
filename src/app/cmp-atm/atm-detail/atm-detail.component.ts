import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { Subscription } from 'rxjs/Subscription';

import { AppConfigService } from '../../_services/app-config.service';
import { CurrentUserService } from '../../_services/current-user.service';

import { AtmService } from '../../_services/atm.service';
import { Atm } from '../../_models/atm.model';


@Component({
  selector: 'app-atm-detail',
  templateUrl: './atm-detail.component.html',
  styleUrls: ['./atm-detail.component.css']
})
export class AtmDetailComponent implements OnInit , OnDestroy{
  atm: Atm;
  id: string;
  atmsSubscription: Subscription;
  subjectSubscription: Subscription;
  draggedCoord: any;
  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private atmService: AtmService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,

  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.atmsSubscription = this.atmService.getAtm(this.id)
          .subscribe(response => {
            this.atm = response;
            this.draggedCoord = this.atm.atmLocation;
          },
          error => console.log(error));
      });

    this.currentUser = this.currentUserService.getCurrentUserInfo();

  }

  onGetDraggedLocation(coord: any) {
    this.draggedCoord = coord;
  }

  onEditAtm(){
    this.router.navigate(['edit'], { relativeTo: this.route });

  }

  ngOnDestroy(){
    this.atmsSubscription.unsubscribe();
  }
}
interface marker {
  name?: string,
  desc?: string,
  lat: number,
  lng: number,
  dragable: boolean
}
