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
  tts: TechnicianTicket;
  currentUser: any;
  responsiblePersons: User[];
  atms: Atm[];
  selectedAtm: Atm;
  parts: Part[];
  selectedPart: Part;



  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.parts.filter(v => v.partDetail.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatter = (x: {partDetail: string}) => '';

  constructor(
    private currentUserService: CurrentUserService,
    private ttService: TechnicianTicketService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
              this.tts = response;
              this.getResponsiblePersonsList();
              this.getAtms();
              this.getPartsByAtmID();

            },
            error => console.log(error));
        }
      });
    this.currentUser = this.currentUserService.getCurrentUserInfo();
  }
  onCancel() {
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

    //  TODO :: pass selected ATM
    this.selectedAtm =  new Atm();
    this.selectedAtm.atmMachineID = "ATM001"

    this.ttsSubscription = this.ttService.getPartByAtmID(this.selectedAtm)
      .subscribe(response => {
        this.parts = response;
        console.log(this.selectedAtm);

      },
      error => console.log(error));
  }

  getAtms() {
    this.ttsSubscription = this.ttService.getAtms()
      .subscribe(response => {
        this.atms = response;
        console.log(this.atms);

      },
      error => console.log(error));
  }

  initForm() {
    this.ttForm = new FormGroup({
      tTicketSymptom: new FormControl(),
      tTicketSolution: new FormControl()
    });
    console.log('initForm');
  }

  onSubmit() {}


}
