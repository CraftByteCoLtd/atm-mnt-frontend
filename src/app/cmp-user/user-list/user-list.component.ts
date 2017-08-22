import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConfigService } from '../../_services/app-config.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

import { User } from '../../_models/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{

  users: User[];
  usersSubscription: Subscription;
  subjectSubscription: Subscription;


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit() {

    this.usersSubscription = this.userService.getUsers()
     .subscribe(
       (users: User[]) => {
         this.users = users;
         this.userService.setListUser(users);
       }
     );

     this.subjectSubscription = this.userService.usersChange
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );

     this.users = this.userService.getListUser();
  }

  ngOnDestroy(){
    this.usersSubscription.unsubscribe();
    this.subjectSubscription.unsubscribe();
  }

  onAddUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}
