import { Component, ViewChild, ViewEncapsulation, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { DataTable, DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CurrentUserService } from '../../_services/current-user.service';
import { TechnicianTicketService } from '../../_services/technician-ticket.service';
import { DispatchTicketService } from '../../_services/dispatch-ticket.service';
import { TechnicianTicket } from '../../_models/technician-ticket.model';
import { User } from '../../_models/user.model';
import { Atm } from '../../_models/atm.model';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-dispatch-ticket-edit',
  templateUrl: './dispatch-ticket-edit.component.html',
  styleUrls: ['./dispatch-ticket-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class DispatchTicketEditComponent implements OnInit {
  dtForm: FormGroup;
  msg: any;
  editMode: boolean = false;
  responsiblePersons: User[] = [];
  selectedResponsiblePerson: User;
  listResponsiblePerson: User[] = [];

  dt: DispatchTicket;
  id: string;
  currentUser: any;
  dtsSubscription: Subscription;
  subjectSubscription: Subscription;

  atms = [];
  atmResource;
  atmsCount: number = 0;
  atmFilter: string;
  selectedAtms = [];
  // @ViewChild(DataTable) atmsTable: DataTable;

  tTickets = [];
  tTicketResource;
  tTicketCount: number = 0;
  selectedTTickets = [];

  mnTask: ManualTask;
  mnTasks = [];


  now = new Date();
  assignmentDate: NgbDateStruct;
  date: {year: number, month: number};

  constructor(
    private currentUserService: CurrentUserService,
    private ttService: TechnicianTicketService,
    private route: ActivatedRoute,
    private router: Router,
    private dtService: DispatchTicketService,
    private alert: AlertService
  ) {
    this.selectedResponsiblePerson = new User();
    this.dt = new DispatchTicket();
    this.atmFilter = "1000";
    this.mnTask={taskDetail:'',taskTitle:'',taskStatus:false};

  }

  selectToday() {
    this.assignmentDate = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
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
    this.selectToday();

  }


  initEdit() {
    this.atmResource = new DataTableResource(this.atms);
    this.atmsCount = this.atms.length;
    let params = { sortBy: "remainingBefore", sortAsc: true, offset: 0, limit: 10 }
    this.atmResource.query(params).then(atms => this.atms = atms);
    this.atmResource.count().then(count => this.atmsCount = count);
    this.mnTasks = this.dt.dtManualTasks;
    this.listResponsiblePerson = <User[]>this.dt.dtResponsiblePersons;

    let ade = new Date(Date.parse(this.dt.dtAssignmentDate.toString()));
    this.assignmentDate =  {year: ade.getUTCFullYear(), month: ade.getUTCMonth() + 1, day: ade.getUTCDate()};
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
    let atmIDs: string[] = [];
    atmIDs = _.map(this.selectedAtms, (o) => { return o.atm.atmMachineID; });
    this.dtsSubscription = this.dtService.getTechnicianTicketsByAtms(atmIDs)
      .subscribe(response => {
        this.tTickets = [];
        _.each(response, (itt) => {
          itt['isSelected'] = false;
          this.tTickets.push(itt);
        });

        this.tTicketResource = new DataTableResource(this.tTickets);
        this.tTicketCount = this.tTickets.length;

        if (this.editMode && this.dt.dtTechnicianTickets != undefined) {
          for (let i = 0; i < this.dt.dtTechnicianTickets.length; i++) {

            this.selectedTTickets = this.dt.dtTechnicianTickets;
            const editTtId = { tTicketID:  this.selectedTTickets[i].tTicketID};
            const editIndex = _.findIndex(this.tTickets, editTtId);
            this.tTickets[editIndex] = this.dt.dtTechnicianTickets[i];
            this.tTicketResource = new DataTableResource(this.tTickets);
          }
        }
      },
      error => console.log(error));
  }

  genDtAtmList(atmInputlist: Atm[], refill) {
    let dtAtmList = [];
    _.each(atmInputlist, (ia) => {
      dtAtmList.push(
        {
          "atm": ia,
          "remainingBefore": ia.atmBalance,
          "actualRemaining": 0,
          "deposit": 0,
          "badBill": 0,
          "dtAtmStatus": 'open',
          "dtRefilledMoney": parseInt(this.atmFilter) - ia.atmBalance,
          "dtEstLoadDay": 0,
          "isSelected": false
        }
      )
    })
    return dtAtmList;

  }

  getAtmsList() {
    this.dtsSubscription = this.dtService.getAtmsByBalanceFilter(this.atmFilter, this.id)
      .subscribe(response => {
        this.atms = this.genDtAtmList(response, this.atmFilter);

        if (this.editMode) {
          this.dtsSubscription = this.dtService.getDispatchTicket(this.id)
            .subscribe(response => {
              this.dt = response;
              this.selectedAtms = this.dt.dtAtms;
              for (let i = 0; i < this.selectedAtms.length; i++) {
                const atmKey = { atm: { atmMachineID: this.selectedAtms[i].atm.atmMachineID } };
                const editIndex = _.findIndex(this.atms, atmKey);
                this.atms[editIndex] = this.selectedAtms[i];
              }
              this.initEdit();
            }, error => console.log(error));
        } else {
          this.atmResource = new DataTableResource(this.atms);
          this.atmsCount = this.atms.length;
          this.getResponsiblePersonsList();
        }
      },
      error => console.log(error));
  }

  onChecked() {
    this.atmResource.query({}, (item => item.isSelected === true)).then(atms => {
      this.selectedAtms = atms;
      this.selectedTTickets = [];
      this.getTechnicianTicketsByAtms();

    }
    );
  }

  onSelectedTts(param) {
    this.tTicketResource.query({}, (item => item.isSelected === param)).then(tts => {
      this.selectedTTickets = tts;
    })
  }


  reloadAtm(params) {
    if (this.atmResource) {
      this.atmResource.query(params).then(atms => this.atms = atms);
      console.log('reloaded the atm list');
    }
  }

  reloadtTicket(params) {
    if (this.tTicketResource) {
      this.tTicketResource.query(params).then(tts => this.tTickets = tts);
      console.log('reloaded the tts list');
    }
  }

  popUpLocation(item) {
    window.open("/atm/" + item.atm._id, "_blank");
  }


  addResponsiblePersonToList() {
    let isExist: boolean = _.some(this.listResponsiblePerson, this.selectedResponsiblePerson);
    if (!isExist) {
      this.listResponsiblePerson.push(this.selectedResponsiblePerson);
    }
    this.selectedResponsiblePerson = new (User);
  }
  removeResponsiblePerson(i: number) {
       let cfResult = confirm("Confirm to remove [ " + this.listResponsiblePerson[i].fullName + " ]?");
    if (cfResult === false) return false;
    this.alert.info('Removed ' + this.listResponsiblePerson[i].fullName + ' from selected reponsible person list.')  ;
    this.listResponsiblePerson.splice(i, 1);


  }

  searchPerson = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' && this.responsiblePersons == undefined ? []
        : this.responsiblePersons.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterPerson = (x: { fullname: string }) => '';

  onTTicketSelect({ selected }) {
    this.selectedTTickets.splice(0, this.selectedTTickets.length);
    this.selectedTTickets.push(...selected);
  }

  initForm() {
    this.dtForm = new FormGroup({
    });
  }

  onSubmit() {
    let cfResult = confirm('Confirm to save change?');
    if (cfResult === false) return;


    let dtItem = new DispatchTicket();
    dtItem.dtResponsiblePersons = <ResponsiblePerson[]>this.listResponsiblePerson;
    dtItem.dtAtms = [];
    _.each(this.selectedAtms, (ia) => {
      dtItem.dtAtms.push(
        ({
          "atm": ia.atm,
          "remainingBefore": +ia.atm.atmBalance,
          "actualRemaining": 0,
          "deposit": 0,
          "badBill": 0,
          "dtAtmStatus": 'open',
          "dtRefilledMoney": +ia.dtRefilledMoney,
          "dtEstLoadDay": +ia.dtEstLoadDay,
          "isSelected": ia.isSelected
        })
      )
    })

    dtItem.dtStatus = 'open';
    dtItem.dtTechnicianTickets = this.selectedTTickets;
    dtItem.dtWithdrawBalance = 0;
    dtItem.dtManualTasks = this.mnTasks;
    //  month in new Date is start from 0 - 11 : jan - dec
    dtItem.dtAssignmentDate = new Date(this.assignmentDate.year,this.assignmentDate.month-1,this.assignmentDate.day,12,0,0,0) ;

    if (this.editMode) {
      dtItem.id = this.dt.id;
      dtItem.dtStatus = this.dt.dtStatus;
      dtItem.dtWithdrawBalance = this.dt.dtWithdrawBalance;
      dtItem.dtID = this.dt.dtID;
      dtItem.created = this.dt.created;

      this.dtsSubscription = this.dtService.updateDispatchTicket(dtItem)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
            this.refreshData();
          }
        });

    } else {
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
    let cfResult = confirm('Confirm to Cancel?');
    if (cfResult === false) return false;
    this.router.navigate(['/dispatch-ticket'], { relativeTo: this.route });
  }
  refreshData() {
    this.dtsSubscription = this.dtService.getActiveDispatchTickets().subscribe(data => {
      this.dtService.setListDispatchTicket(data);
      this.router.navigate(['./../'], { relativeTo: this.route });

    })
  }
  onGetDraggedLocation() { }

  addTask() {
    if (this.mnTask.taskTitle == "" || this.mnTask === undefined) {
      this.alert.error('The Task field cannot be empty!');
      return false;
    }

    let nt: ManualTask = {
      taskTitle: this.mnTask.taskTitle,
      taskDetail: this.mnTask.taskDetail,
      taskStatus: false
    };
    this.mnTasks.push(nt);
    this.alert.info('Manual Task ' + nt.taskTitle + ' added')
    this.mnTask.taskDetail = "";
    this.mnTask.taskTitle = "";
  }

  removeManualTask(i: number) {
    let cfResult = confirm("Confirm to remove the manual task [ " + this.mnTasks[i].taskTitle + " ]?");
    if (cfResult === false) return false;
    this.mnTasks.splice(i, 1);
  }

  orderTask(isUpParam: boolean, indx: number) {
    let isUp: boolean = isUpParam;

    if (isUp && indx > 0) {
      this.mnTasks = this.moveArray(this.mnTasks, indx, indx - 1);
    } else if (!isUp && indx < this.mnTasks.length) {
      this.mnTasks = this.moveArray(this.mnTasks, indx, indx + 1);
    }
  }

  moveArray(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  };

}


interface ResponsiblePerson {
  fullName: string;
  userName: string;
  id: string;
}

interface DtAtm {
  atm: Atm;
  remainingBefore: number;
  actualRemaining: number;
  deposit: number;
  badBill: number;
  dtAtmStatus: string;
  dtRefilledMoney: number;
  dtEstLoadDay: number;
  isSelected: boolean;
}

interface AtmLocation {
  lat: Number;
  lng: Number;

}

interface ManualTask {
  taskTitle: string;
  taskDetail: string;
  taskStatus: boolean;
}
