import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';


import { CurrentUserService } from '../../_services/current-user.service';
import { TechnicianTicketService } from '../../_services/technician-ticket.service';
import { TechnicianTicket } from '../../_models/technician-ticket.model';
import { User } from '../../_models/user.model';
import { Atm } from '../../_models/atm.model';
import { Part } from '../../_models/part.model';

@Component({
  selector: 'app-technician-ticket-edit',
  templateUrl: './technician-ticket-edit.component.html',
  styleUrls: ['./technician-ticket-edit.component.css']
})
export class TechnicianTicketEditComponent implements OnInit {

  editMode = false;
  ttForm: FormGroup;

  msg: any;
  tt: TechnicianTicket;
  id: string;
  ttsSubscription: Subscription;
  subjectSubscription: Subscription;
  currentUser: any;

  responsiblePersons: User[] = [];
  selectedResponsiblePerson: User;

  atms: Atm[] = [];
  selectedAtm: Atm;

  parts: Part[] = [];
  selectedPart: Part;


  searchPerson = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' && this.responsiblePersons == undefined ? []
        : this.responsiblePersons.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterPerson = (x: {fullname: string}) => '';


  searchPart = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .do(() => {
        this.selectedAtm.atmMachineID === undefined ?  this.setError('Atm Selection is required!'):''
      })
      .map(term => term === '' && this.parts == undefined ? []
        : this.parts.filter(v => v.partDetail.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterPart = (x: {partDetail: string}) => '';


  searchAtm = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .do(()=>{this.selectedPart = new Part()})
      .map(term => term === '' ? []
        : this.atms.filter(v => v.atmMachineID.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      .do((atms)=>{
          atms.length === 0 ? this.setError('No atm found!'): this.setNoError()
      });
  formatterAtm = (x: {atmMachineID: string}) => '';


  constructor(
    private currentUserService: CurrentUserService,
    private ttService: TechnicianTicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedResponsiblePerson = new User();
    this.selectedPart = new Part();
    this.selectedAtm = new Atm();
    this.selectedAtm.atmMachineID = undefined;
    this.tt = new TechnicianTicket();

  }

  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.ttsSubscription = this.ttService.getTechnicianTicket(this.id)
            .subscribe(response => {
              this.tt = response;
              this.getResponsiblePersonsList();
              this.getAtms();
              this.initForm();
            },
            error => console.log(error));
        }
      });
    this.currentUser = this.currentUserService.getCurrentUserInfo();
  }
  onCancel() {
    let cfResult  = confirm('Confirm to Cancel?');
    if (cfResult === false) return false;
    this.router.navigate(['/technician-ticket'], { relativeTo: this.route });
  }

  getResponsiblePersonsList() {
    this.ttsSubscription = this.ttService.getResponsiblePersons()
      .subscribe(response => {
        this.responsiblePersons = response;
        console.log(this.responsiblePersons);
      },
      error => console.log(error));
  }

  getPartsByAtmID() {
    this.ttsSubscription = this.ttService.getPartByAtmID(this.selectedAtm)
      .subscribe(response => {
        this.parts = response;
      },
      error => console.log(error));
  }

  getAtms() {
    this.ttsSubscription = this.ttService.getAtms()
      .subscribe(response => {
        this.atms = response;
      },
      error => console.log(error));
  }

  initForm() {
    let editId: string;
    let editTtiketSymptom: string;
    let editTticketSolution: string;
    let editTticketCreated: Date;
    let editTticketCreatedBy: User;
    let editTticketID: string;
    let editTticketRepairedPart: Part = new Part();
    let editTticketResponsiblePerson: ResponsiblePerson;
    let editTticketStatus: string;
    let editAtmMachineID: Atm = new Atm();

    if (this.editMode) {
        editId = this.id;
        editTtiketSymptom = this.tt.tTicketSymptom;
        editTticketSolution = this.tt.tTicketSolution;
        editTticketCreated = this.tt.tTicketCreated;
        editTticketCreatedBy = this.tt.tTicketCreatedBy;
        editTticketID = this.tt.tTicketID;
        editTticketRepairedPart = this.tt.tTicketRepairedPart;
        editTticketResponsiblePerson = this.tt.tTicketResponsiblePerson;
        editTticketStatus = this.tt.tTicketStatus;
        editAtmMachineID.atmMachineID = this.tt.atmMachineID;
        this.selectedAtm =  editAtmMachineID;
        this.selectedPart = editTticketRepairedPart;
        this.selectedResponsiblePerson = editTticketResponsiblePerson ? <User> editTticketResponsiblePerson : new User();
        this.getPartsByAtmID();
    }else{
        this.getAtms();
        this.getResponsiblePersonsList();
    }

    this.ttForm = new FormGroup({
      tTicketSymptom: new FormControl( editTtiketSymptom , Validators.required),
      tTicketSolution: new FormControl( editTticketSolution, Validators.required),
      tTicketStatus: new FormControl( editTticketStatus, Validators.required),
      tTicketID: new FormControl(editTticketID),
      tTicketCreated: new FormControl(editTticketCreated)

    });
  }

  onSubmit() {
    let cfResult  = confirm('Confirm to save change?');
    if (cfResult === false) return;

    let ttItem = new TechnicianTicket();
    ttItem.id = this.id;
    ttItem.tTicketID = this.ttForm.value.tTicketID;
    ttItem.tTicketSymptom = this.ttForm.value.tTicketSymptom;
    ttItem.tTicketSolution = this.ttForm.value.tTicketSolution;
    ttItem.tTicketCreatedBy = this.ttForm.value.tTicketCreated;
    ttItem.tTicketCreatedBy = new User ();

    ttItem.tTicketCreatedBy.fullName = this.currentUser.fullName;
    ttItem.tTicketCreatedBy.userName = this.currentUser.userName;
    ttItem.tTicketCreatedBy.id = this.currentUser.id;


    ttItem.tTicketResponsiblePerson = <ResponsiblePerson> this.selectedResponsiblePerson;
    ttItem.tTicketStatus = this.ttForm.value.tTicketStatus;
    ttItem.tTicketRepairedPart = this.selectedPart;
    ttItem.atmMachineID = this.selectedAtm.atmMachineID;

    if (this.editMode) {
       this.ttsSubscription = this.ttService.updateTechnicianTicket(ttItem)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
            this.refreshData();
          }
        });
    } else {

      this.ttsSubscription = this.ttService.createTechnicianTicket(ttItem)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
          this.refreshData();
          }
        });
    }


  }

  refreshData(){
    this.ttsSubscription = this.ttService.getTechnicianTickets().subscribe(data =>{
        this.ttService.setListTechnicianTicket(data);
        this.router.navigate(['./../'], { relativeTo: this.route });

    })
  }

  setError(msg: string){
      this.msg = {
        success: false,
        message: msg
      }
  }

  setNoError(){
      this.msg = {
        success: true,
        message: ''
    }
  }
}

interface ResponsiblePerson {
  fullName: string;
  userName: string;
  id: string;
}
