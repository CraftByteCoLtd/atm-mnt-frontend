import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConfigService } from '../../_services/app-config.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

import { User } from '../../_models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.userService.getUsers()
      .subscribe(response => {
        this.users = response;
      },
      error => console.log(error));

  }
  onAddUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}
