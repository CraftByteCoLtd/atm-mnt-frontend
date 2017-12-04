import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CompanyProfile } from '../_models/company-profile.model';
import { AlertService } from '../_services/alert.service';
import { CompanyProfileService } from '../_services/company-profile.service';


@Component({
	selector: 'app-company-profile',
	templateUrl: './company-profile.component.html',
	styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

	profileForm: FormGroup;
	cmProfiles: CompanyProfile[] = [];
	profileSubscription: Subscription;
	msg: any;
	isUploadDone: boolean = false;
	profileLogo: any;

	constructor(
		private companyProfileService: CompanyProfileService,
		private alert: AlertService,
		private route: ActivatedRoute,
		private router: Router,
		private el: ElementRef) { }

	ngOnInit() {
		this.onInitForm();

		this.getCompanyProfile();

	}

	getCompanyProfile() {
		this.profileSubscription = this.companyProfileService.getCompanyProfiles()
			.subscribe(response => {
				this.cmProfiles = response;
				this.onInitForm();
				console.log(this.cmProfiles);
			},
			error => console.log(error));
	}

	onInitForm() {
		let editCompanyId = '';
		let editCompanyName = '';
		let editCompanyOwner = '';
		let editCompanyDetail = '';
		let editCompanyEmail = '';
		let editCompanyPhone = '';
		let editCompanyLogo = '';
		let editCompanyIsActive: boolean = false;

		if (this.cmProfiles.length > 0) {
			let cmpp = this.cmProfiles[0];
			editCompanyId = cmpp['companyId'];
			editCompanyName = cmpp['companyName'];
			editCompanyOwner = cmpp['companyOwner'];
			editCompanyDetail = cmpp['companyDetail'];
			editCompanyEmail = cmpp['companyEmail'];
			editCompanyPhone = cmpp['companyPhone'];
			editCompanyLogo = cmpp['companyLogo'];
			this.profileLogo = editCompanyLogo;
			editCompanyIsActive = cmpp['companyIsActive'];
		}

		this.profileForm = new FormGroup({
			companyId: new FormControl(editCompanyId, Validators.required),
			companyName: new FormControl(editCompanyName, Validators.required),
			companyOwner: new FormControl(editCompanyOwner, Validators.required),
			companyDetail: new FormControl(editCompanyDetail, Validators.required),
			companyEmail: new FormControl(editCompanyEmail, Validators.required),
			companyPhone: new FormControl(editCompanyPhone, Validators.required),
			companyLogo: new FormControl(editCompanyLogo, Validators.required),
			companyIsActive: new FormControl(editCompanyIsActive, Validators.required)

		});
	}

	passwordMatchValidator(g: FormGroup) {
		return g.get('userPwd').value === g.get('userPwd2').value
			? null : { 'mismatch': true };
	}



	onSubmit() {
		let cfResult = confirm('Confirm to save change?');
		if (cfResult === false) return;

		let cpp: CompanyProfile = new CompanyProfile();
		cpp.companyId = this.profileForm.value.companyId;
		cpp.companyName = this.profileForm.value.companyName;
		cpp.companyOwner = this.profileForm.value.companyOwner;
		cpp.companyDetail = this.profileForm.value.companyDetail;
		cpp.companyEmail = this.profileForm.value.companyEmail;
		cpp.companyPhone = this.profileForm.value.companyPhone;
		cpp.companyLogo = this.profileForm.value.companyLogo;
		cpp.companyIsActive = this.profileForm.value.companyIsActive;

		this.profileSubscription = this.companyProfileService.createCompanyProfile(cpp)
			.subscribe(data => {
				this.msg = data;
				if (data['success'] === true) {
					this.alert.success(data['message']);
				} else {
					this.alert.error(data['message']);
				}
			});
	}

	uploadLogo() {
		this.isUploadDone = false;
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#logo');
		let fileCount: number = inputEl.files.length;
		let formData = new FormData();
		if (fileCount > 0) { // a file was selected
			for (let i = 0; i < fileCount; i++) {
				formData.append('file', inputEl.files.item(i));
			}

			this.companyProfileService.uploadCsv(formData).subscribe(
				(msg) => {
					this.isUploadDone = msg.success;
					if (msg.success === true) {
						this.alert.success('Upload the photo successfully ');
						this.profileLogo = msg['message'];
						this.profileForm.patchValue({'companyLogo':this.profileLogo});
					} else {
						this.alert.error("Error! Please upload only the photo type included (*.png, *.jpg , *.jpeg).");
					}
				},
				(error) => console.log(error)
			);
		}
	}

	cancelUpload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#logo');
    inputEl.value = "";
  }
}
