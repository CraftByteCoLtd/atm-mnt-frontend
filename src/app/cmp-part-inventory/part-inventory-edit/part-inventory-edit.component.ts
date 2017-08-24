import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';


import { CurrentUserService } from '../../_services/current-user.service';
import { PartInventoryService } from '../../_services/part-inventory.service';
import { Part } from '../../_models/part.model';
import { Atm } from '../../_models/atm.model';

@Component({
  selector: 'app-part-inventory-edit',
  templateUrl: './part-inventory-edit.component.html',
  styleUrls: ['./part-inventory-edit.component.css']
})
export class PartInventoryEditComponent implements OnInit {

  editMode = false;
  partForm: FormGroup;

  msg: any;
  part: Part;
  id: string;
  partsSubscription: Subscription;
  subjectSubscription: Subscription;
  currentUser: any;
  partTypes: any = [];
  atms: Atm[] = [];
  selectedAtm: Atm;

  constructor(
    private currentUserService: CurrentUserService,
    private partService: PartInventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedAtm = new Atm();
    this.selectedAtm.atmMachineID = undefined;
    this.part = new Part();

  }
  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.partsSubscription = this.partService.getPart(this.id)
            .subscribe(response => {
              this.part = response;
              this.getAtms();
              this.getPartType();

              this.initForm();
            },
            error => console.log(error));
        }
      });
    this.currentUser = this.currentUserService.getCurrentUserInfo();
  }

  initForm() {
    let editId: string;
    let editPartCreated: Date;
    let editPartID: string;
    let editPartDetail: string;
    let editPartType: string;
    let editPartStock: number;
    let editPartPrice: number;
    let editPartSerialNumber: string;
    let editAtmMachineID: Atm = new Atm();

    if (this.editMode) {
      editId = this.id;
      editPartCreated = this.part.created;
      editPartID = this.part.partID;
      editPartDetail = this.part.partDetail;
      editPartType = this.part.partType;
      editPartStock = this.part.partStock;
      editPartPrice = this.part.partPrice;
      editPartSerialNumber = this.part.partSerialNumber;
      editAtmMachineID.atmMachineID = this.part.atmMachineID;
      this.selectedAtm = editAtmMachineID;
    } else {
      this.getAtms();

    }

    this.partForm = new FormGroup({
      partDetail: new FormControl(editPartDetail, Validators.required),
      partType: new FormControl(editPartType, Validators.required),
      partStock: new FormControl(editPartStock, Validators.required),
      partPrice: new FormControl(editPartPrice, Validators.required),
      partSerialNumber: new FormControl(editPartSerialNumber, Validators.required),
      partID: new FormControl(editPartID),
      partCreated: new FormControl(editPartCreated)

    });
  }

  getAtms() {
    this.partsSubscription = this.partService.getAtms()
      .subscribe(response => {
        this.atms = response;
      },
      error => console.log(error));
  }

  getPartType() {
    this.partsSubscription = this.partService.getPartType()
      .subscribe(response => {
        this.partTypes = response;
        console.log(this.partTypes);
      },
      error => console.log(error));
  }
  searchAtm = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.atms.filter(v => v.atmMachineID.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      .do((atms) => {
        atms.length === 0 ? this.setError('No atm found!') : this.setNoError()
      });
  formatterAtm = (x: { atmMachineID: string }) => '';

  onCancel() {
    let cfResult = confirm('Confirm to Cancel?');
    if (cfResult === false) return false;
    this.router.navigate(['/part-inventory'], { relativeTo: this.route });
  }

  onSubmit(){
    let cfResult  = confirm('Confirm to save change?');
    if (cfResult === false) return;

    let partItem: Part = new Part();
    partItem.id = this.id;
    partItem.partID = this.partForm.value.partID;
    partItem.partDetail = this.partForm.value.partDetail;
    partItem.partType = this.partForm.value.partType;
    partItem.partStock = this.partForm.value.partStock;
    partItem.partPrice = this.partForm.value.partPrice;
    partItem.partSerialNumber = this.partForm.value.partSerialNumber;
    partItem.atmMachineID = this.selectedAtm.atmMachineID;
    partItem.created = this.partForm.value.partCreated;
    if (this.editMode) {
       this.partsSubscription = this.partService.updatePart(partItem)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
            this.refreshData();
          }
        });
    } else {

      this.partsSubscription = this.partService.createPart(partItem)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
          this.refreshData();
          }
        });
    }
  }
  refreshData(){
    this.partsSubscription = this.partService.getParts().subscribe(data =>{
        this.partService.setListPart(data);
        this.router.navigate(['/part-inventory'], { relativeTo: this.route });

    })
  }
  setError(msg: string) {
    this.msg = {
      success: false,
      message: msg
    }
  }

  setNoError() {
    this.msg = {
      success: true,
      message: ''
    }
  }
}
