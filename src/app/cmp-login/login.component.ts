import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(f:NgForm) {

    this.model.username = f.value.username;
    this.model.password = f.value.password;

    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(result => {
          if (result.success === true ) {
              this.router.navigate(['/home']);
          } else {
              this.error = result.message;
              this.loading = false;

          }
        });
  }


}
