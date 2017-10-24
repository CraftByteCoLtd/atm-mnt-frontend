import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit,OnDestroy {

  usersSubscription:Subscription;
  id: string;
  user: User;
  editMode = false;
  userForm: FormGroup;
  authRulesGroup: FormGroup;
  msg: any;

  constructor(
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }


  ngOnInit() {

    this.initForm();
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.usersSubscription = this.userService.getUser(this.id)
            .subscribe(response => {
              this.user = response;
              this.initForm();
            },
            error => console.log(error));
        } else {
          this.initForm();
        }
      });
  }

  ngOnDestroy(){
    if (this.editMode) {
      this.usersSubscription.unsubscribe();

    }
  }

  onCancel() {
    this.userForm.clearValidators();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let editFirstName = '';
    let editLastName = '';
    let editUserName = ''
    let editUserPwd = '';
    let userPhones = new FormArray([]);
    let userEmails = new FormArray([]);
    let isAdmin: boolean;
    let isWareHouseManager: boolean;
    let isDispatcherManager: boolean;
    let isAtmTechnician: boolean;
    let isAtmVaulter: boolean;
    let isActive: boolean;
    let isTreasurer: boolean;


    if (this.editMode) {
      editFirstName = this.user.firstName;
      editLastName = this.user.lastName;
      editUserName = this.user.userName;
      editUserPwd = ''
      // userPhones form array
      if (this.user['userPhones']) {
        for (let userPhone of this.user.userPhones) {
          userPhones.push(
            new FormGroup({
              'desc': new FormControl(userPhone.desc, Validators.required),
              'number': new FormControl(userPhone.number, [
                Validators.required,])
            })
          );
        }
      }
      //  userEmails form array
      if (this.user['userEmails']) {
        for (let userEmail of this.user.userEmails) {
          userEmails.push(
            new FormGroup({
              'desc': new FormControl(userEmail.desc, Validators.required),
              'email': new FormControl(userEmail.email, [
                Validators.required])
            })
          );
        }
      }

      if (this.user['authRules']) {
        let _authRules = this.user['authRules'];
        isAdmin = _authRules.isAdmin;
        isWareHouseManager = _authRules.isWareHouseManager;
        isDispatcherManager = _authRules.isDispatcherManager;
        isAtmTechnician = _authRules.isAtmTechnician;
        isAtmVaulter = _authRules.isAtmVaulter;
        isTreasurer = _authRules.isTreasurer;
        isActive = this.user.isActive;
      }

    } // check if in editMode

    // let _authRules = this.user['authRules'];
    this.authRulesGroup = new FormGroup({
      isAdmin: new FormControl(isAdmin),
      isWareHouseManager: new FormControl(isWareHouseManager),
      isDispatcherManager: new FormControl(isDispatcherManager),
      isAtmTechnician: new FormControl(isAtmTechnician),
      isAtmVaulter: new FormControl(isAtmVaulter),
      isTreasurer: new FormControl(isTreasurer)
    });


    this.userForm = new FormGroup({
      firstName: new FormControl(editFirstName, Validators.required),
      lastName: new FormControl(editLastName, Validators.required),
      userName: new FormControl(editUserName, Validators.required),
      userPwd: new FormControl(editUserPwd, Validators.required),
      userPwd2: new FormControl(editUserPwd, Validators.required),
      userPhones: userPhones,
      userEmails: userEmails,
      authRules: this.authRulesGroup,
      isActive: new FormControl(isActive),
      id: new FormControl(this.id)


    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('userPwd').value === g.get('userPwd2').value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.editMode) {
       this.usersSubscription = this.userService.updateUser(this.userForm.value)
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

      this.usersSubscription = this.userService.createUser(this.userForm.value)
        .subscribe(data => {
          this.msg = data;
          if (data['success'] === true) {
          this.alertSuccess(data['message']);
          this.refreshData();
          }else{
            this.alertError(data['message']);
          }
        });
    }
  }

  alertSuccess(msg: string){
    this.alert.success(msg,true);
  }

  alertError(msg: string){
    this.alert.error(msg,true);
  }

  refreshData(){
    this.usersSubscription = this.userService.getUsers().subscribe(data =>{
        this.userService.setListUser(data);
        this.router.navigate(['./../'], { relativeTo: this.route });

    })
  }



  onAddPhone() {
    (<FormArray>this.userForm.get('userPhones')).push(
      new FormGroup({
        'desc': new FormControl('', Validators.required),
        'number': new FormControl('', [Validators.required])
      })
    );
  }
  onDeletePhone(index: number) {
    (<FormArray>this.userForm.get('userPhones')).removeAt(index);
  }

  onAddEmail() {
    (<FormArray>this.userForm.get('userEmails')).push(
      new FormGroup({
        'desc': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.email])
      })
    );

  }

  onDeleteEmail(index: number) {
    (<FormArray>this.userForm.get('userEmails')).removeAt(index);
  }
}
