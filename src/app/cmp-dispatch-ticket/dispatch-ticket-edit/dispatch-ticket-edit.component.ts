import { Component,ViewChild,ViewEncapsulation, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import _ from "lodash";

import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { CurrentUserService } from '../../_services/current-user.service';
import { TechnicianTicketService } from '../../_services/technician-ticket.service';
import { DispatchTicketService } from '../../_services/dispatch-ticket.service';
import { TechnicianTicket } from '../../_models/technician-ticket.model';
import { User } from '../../_models/user.model';
import { Atm } from '../../_models/atm.model';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';

@Component({
  selector: 'app-dispatch-ticket-edit',
  templateUrl: './dispatch-ticket-edit.component.html',
  styleUrls: ['./dispatch-ticket-edit.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class DispatchTicketEditComponent implements OnInit {
  dtForm: FormGroup;
  msg:any;
  editMode: boolean = false;
  responsiblePersons: User[] = [];
  selectedResponsiblePerson: User;
  listResponsiblePerson: User[] = [];

  dt: DispatchTicket;
  id: string;
  currentUser: any;
  dtsSubscription: Subscription;
  subjectSubscription: Subscription;

  atms:Atm[];
  atmFilter: string;
  selectedAtms: Atm[] = [];

  tTickets: TechnicianTicket[];
  selectedTTickets: TechnicianTicket[] = [];

  constructor(
    private currentUserService: CurrentUserService,
    private ttService: TechnicianTicketService,
    private route: ActivatedRoute,
    private router: Router,
    private dtService: DispatchTicketService
  ) {
    this.selectedResponsiblePerson = new User();
    this.dt = new DispatchTicket();
    this.atmFilter ="500";
  }

  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.getAtmsList();
      });
    this.currentUser = this.currentUserService.getCurrentUserInfo();
    this.getResponsiblePersonsList();
  }

  initEdit(){
    this.listResponsiblePerson = <User[]> this.dt.dtResponsiblePersons;
    this.getTechnicianTicketsByAtms();
  }

  getResponsiblePersonsList() {
    this.dtsSubscription = this.dtService.getResponsiblePersons()
      .subscribe(response => {
        this.responsiblePersons = response;
      },
      error => console.log(error));
  }

  getTechnicianTicketsByAtms() {
    let atmIDs:string[] = [];
    atmIDs = _.map(this.selectedAtms,(o)=>{ return o.atmMachineID; });
    this.dtsSubscription = this.dtService.getTechnicianTicketsByAtms(atmIDs)
      .subscribe(response => {
        this.tTickets = response;
        if (this.editMode) {
          for (let i = 0; i < this.dt.dtTechnicianTickets.length; i++) {
              this.selectedTTickets.push(_.find(this.tTickets,this.dt.dtTechnicianTickets[i]));
          }
        }
      },
      error => console.log(error));
  }


  getAtmsList() {
  this.dtsSubscription = this.dtService.getAtmsByBalanceFilter(this.atmFilter,this.id)
    .subscribe(response => {
      this.atms = response;
      if (this.editMode) {
        this.dtsSubscription = this.dtService.getDispatchTicket(this.id)
          .subscribe(response => {
            this.dt = response;
            for (let i = 0; i < this.dt.dtAtms.length; i++) {
                this.selectedAtms.push(_.find(this.atms,this.dt.dtAtms[i].atm));
            }
            this.initEdit();
          }, error => console.log(error));}
    },
    error => console.log(error));
  }

  addResponsiblePersonToList(){
    let isExist: boolean = _.some(this.listResponsiblePerson,this.selectedResponsiblePerson);
    if (!isExist) {
      this.listResponsiblePerson.push(this.selectedResponsiblePerson);
    }
    this.selectedResponsiblePerson = new(User);
  }
  removeResponsiblePerson(i: number){
    this.listResponsiblePerson.splice(i,1);
  }

  searchPerson = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' && this.responsiblePersons == undefined ? []
        : this.responsiblePersons.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterPerson = (x: {fullname: string}) => '';


  onSelect({ selected }) {
    //  console.log('Select Event', selected, this.selectedAtms);
     this.selectedAtms.splice(0, this.selectedAtms.length);
     this.selectedAtms.push(...selected);
     this.selectedTTickets = [];
     this.getTechnicianTicketsByAtms();
   }

   onActivate(event) {
     console.log('Activate Event', event);
   }

   onTTicketSelect({ selected }) {
     //  console.log('Select Event', selected, this.selectedAtms);
      this.selectedTTickets.splice(0, this.selectedTTickets.length);
      this.selectedTTickets.push(...selected);
    }

    onTTicketsActivate(event) {
      console.log('Activate Event', event);
    }

    initForm() {
      this.dtForm = new FormGroup({
      });
    }

    onSubmit() {
      let cfResult  = confirm('Confirm to save change?');
      if (cfResult === false) return;


      let dtItem = new DispatchTicket();
      dtItem.dtResponsiblePersons = <ResponsiblePerson[]> this.listResponsiblePerson;
      dtItem.dtAtms = [];
      _.each(this.selectedAtms,(ia) => {
            dtItem.dtAtms.push(
             ({
                "atm": ia,
                "remainingBefore":ia.atmBalance,
                "deposit":0,
                "badBill":0,
                "dtAtmStatus":'open'


              })
            )
      })

      dtItem.dtStatus ='open';
      dtItem.dtTechnicianTickets = this.selectedTTickets;
      dtItem.dtWithdrawBalance = 0;

      if (this.editMode) {
       dtItem.id = this.dt.id;
       dtItem.dtStatus = this.dt.dtStatus;
       dtItem.dtWithdrawBalance = this.dt.dtWithdrawBalance;
       dtItem.dtID = this.dt.dtID;
       dtItem.created  = this.dt.created;
       this.dtsSubscription = this.dtService.updateDispatchTicket(dtItem)
            .subscribe(data => {
              this.msg = data;
              if (data['success'] === true) {
               this.refreshData();
              }
            });

      }else{
        this.dtsSubscription = this.dtService.createDispatchTicket(dtItem)
            .subscribe(data => {
              this.msg = data;
              if (data['success'] === true) {
               this.refreshData();
              }
            });
      }



    }

    onCancel() {
      let cfResult  = confirm('Confirm to Cancel?');
      if (cfResult === false) return false;
      this.router.navigate(['/dispatch-ticket'], { relativeTo: this.route });
    }
    refreshData(){
      this.dtsSubscription = this.dtService.getDispatchTickets().subscribe(data =>{
          this.dtService.setListDispatchTicket(data);
          this.router.navigate(['./../'], { relativeTo: this.route });

      })
    }
   onGetDraggedLocation(){}

 }


interface ResponsiblePerson {
  fullName: string;
  userName: string;
  id: string;
}

interface DtAtm{
  // atmMachineID: string;
  atm: Atm;
  remainingBefore: number;
  deposit: number;
  badBill: number;
  dtAtmStatus: string;
  // atmLocation:AtmLocation;
  // atmStatus:string;
}

interface AtmLocation {
  lat: Number;
  lng: Number;

}
