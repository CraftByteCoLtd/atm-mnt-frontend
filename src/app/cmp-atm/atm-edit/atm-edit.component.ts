import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AppConfigService } from '../../_services/app-config.service';
import { CurrentUserService } from '../../_services/current-user.service';
import { AtmService } from '../../_services/atm.service';
import { AlertService } from '../../_services/alert.service';

import { Atm } from '../../_models/atm.model';

@Component({
  selector: 'app-atm-edit',
  templateUrl: './atm-edit.component.html',
  styleUrls: ['./atm-edit.component.css']
})
export class AtmEditComponent implements OnInit, OnDestroy {
  editMode = false;
  atmForm: FormGroup;
  atmLocationFormGroup: FormGroup;
  atmUpdatedByFormGroup: FormGroup;

  msg: any;
  atm: Atm;
  id: string;
  atmsSubscription: Subscription;
  subjectSubscription: Subscription;
  draggedCoord: any;
  lat: number =30.160564279505945;
  lng: number = -97.79;
  zoom: number = 10;
  markers: marker[] = []
  currentUserFullName:string;


  constructor(
    private alert: AlertService,
    private atmService: AtmService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService

  ) { }

  ngOnInit() {

    this.initForm();
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
          if(this.editMode){
          this.atmsSubscription = this.atmService.getAtm(this.id)
            .subscribe(response => {
              this.atm = response;
              this.initForm();
              this.draggedCoord = this.atm.atmLocation;
            },
            error => console.log(error));
          }else{
            this.atm = new Atm();
            this.atm.atmMachineID ="New Machine";
            this.atm.atmNote = "";
            this.atm.atmLocation = {lat : this.lat,lng : this.lng};
          }
          });
      this.currentUserFullName = this.currentUserService.getCurrentUserInfo()['fullName'];
  }

  onGetDraggedLocation(coord: any) {
    this.draggedCoord = coord;
    this.atmForm.get('atmLocation.lat').patchValue(coord['lat']);
    this.atmForm.get('atmLocation.lng').patchValue(coord['lng']);

  }

  ngOnDestroy(){
    if (this.editMode) {
     this.atmsSubscription.unsubscribe();
    }
  }

  private initForm() {
    let editAtmMachineID: string;
    let editAtmBalance: number;
    let editAtmLocationLat:number;
    let editAtmLocationLng:number;
    let editAtmNote: string;
    let editAtmStatus: boolean;


    if (this.editMode) {
      editAtmMachineID = this.atm.atmMachineID;
      editAtmBalance = +this.atm.atmBalance;
      editAtmLocationLat = +this.atm.atmLocation['lat'];
      editAtmLocationLng = +this.atm.atmLocation['lng'];
      editAtmNote = this.atm.atmNote;
      editAtmStatus = this.atm.atmStatus =='online' ? true:false;

    } // check if in editMode


    this.atmLocationFormGroup = new FormGroup({
      lat: new FormControl(editAtmLocationLat),
      lng: new FormControl(editAtmLocationLng),
    });
    this.atmUpdatedByFormGroup = new FormGroup({

      fullName: new FormControl(this.currentUserFullName)
    });

    this.atmForm = new FormGroup({
      atmMachineID: new FormControl(editAtmMachineID, Validators.required),
      atmBalance: new FormControl(editAtmBalance, Validators.required),
      atmLocation: this.atmLocationFormGroup,
      atmNote: new FormControl(editAtmNote),
      atmStatus: new FormControl(editAtmStatus),
      id: new FormControl(this.id),
      atmUpdatedBy: this.atmUpdatedByFormGroup
    });
  }

  alertSuccess(msg: string){
    this.alert.success(msg,true);

  }

  alertError(msg: string){
    this.alert.error(msg,true);

  }

  onCancel() {
    this.atmForm.clearValidators();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {

    if (this.editMode) {
       this.atmsSubscription = this.atmService.updateAtm(this.atmForm.value)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
            this.alertSuccess(data['message']);
            this.refreshData();
          }else{
            this.alertError(data['message']);
          }
        });
    } else {

      this.atmsSubscription = this.atmService.createAtm(this.atmForm.value)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
            this.refreshData();
          }else{
            this.alertError(data['message']);
          }

        });
    }
  }

  refreshData(){
    this.atmsSubscription = this.atmService.getAtms().subscribe(data =>{
        this.atmService.setListAtm(data);
        this.router.navigate(['./../'], { relativeTo: this.route });

    })
  }

}
interface marker {
  name?: string,
  desc?: string,
  lat: number,
  lng: number,
  dragable: boolean
}
