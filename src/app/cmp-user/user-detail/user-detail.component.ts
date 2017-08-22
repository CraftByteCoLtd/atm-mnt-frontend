import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: string;
  usersSubscription:Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

  }
  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.userService.getUser(this.id)
          .subscribe(response => {
            this.user = response;
          },
          error => console.log(error));
      });
  }

  onEditUser() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }


}
