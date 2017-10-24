import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { TreasuryService } from '../_services/treasury.service';
import { CurrentUserService } from '../_services/current-user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})

export class UploadCsvComponent implements OnInit {

  dt: any;
  isSumUpView: boolean = true;

  rollupItemResource;
  rollupItems = [];
  rollupItemCount = 0;

  rawItemResource;
  rawItems = [];
  rawItemCount = 0;

  isUpdateDone = false;
  isUploadDone = false;

  constructor(
    private alert: AlertService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,
    private treasuryService: TreasuryService,
    private el: ElementRef
  ) { }
  ngOnInit() {
  }

  uploadCsv() {
    this.isUpdateDone = false;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#csv');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file', inputEl.files.item(i));
      }

      this.treasuryService.uploadCsv(formData).subscribe(
        (msg) => {
          this.isUploadDone = msg.success;
          if (msg.success === true) {
            this.alertSuccess(msg['message']);
            this.dt = msg.data;
            this.rollupItemResource = new DataTableResource(msg.data["sumUp"]);
            this.rollupItemResource.count().then(count => this.rollupItemCount = count);
            this.rawItemResource = new DataTableResource(msg.data["raw"]);
            this.rawItemResource.count().then(count => this.rawItemCount = count)
          } else {
            this.alertError("Error!: Please upload only the csv file.");
          }
        },
        (error) => console.log(error)
      );

    }
  }

  viewRollup() {
    this.isSumUpView = true;
  }
  viewRaw() {
    this.isSumUpView = false;
  }
  rollupReload(params) {
    this.rollupItemResource.query(params).then(items => this.rollupItems = items);
  }

  rawReload(params) {
    this.rawItemResource.query(params).then(items => this.rawItems = items);
  }

  doUpdateBalance() {

    let cfResult = confirm('Confirm to update atm Balance ?');
    if (cfResult === false) return;

    const _RECIEVED_STATUS = 'recieved';
    this.treasuryService.updateAtmBalanceByCsv(this.dt._id).subscribe((msg) => {
      this.isUpdateDone = msg.success;
      this.alertSuccess(msg['message']);
    }, (error) => { console.log(error) })
  }

  selectedFile() {
    this.uploadCsv();
  }

  alertSuccess(msg: string) {
    this.alert.success(msg, true);
  }

  alertError(msg: string) {
    this.alert.error(msg, true);
  }

  goToTreasury() {
    this.router.navigate(['/treasury'], { relativeTo: this.route });
  }
  cancelUpload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#csv');
    inputEl.value = "";
    this.dt.raw = [];
    this.dt.sumUp = [];
    this.dt.originalName = "";
    this.isSumUpView = true;
    this.isUpdateDone = false;
    this.isUploadDone = false;
  }

}
