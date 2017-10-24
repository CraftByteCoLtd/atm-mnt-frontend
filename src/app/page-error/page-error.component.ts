import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent implements OnInit {

  constructor(
  	private authenticationService: AuthenticationService
  	) { }

  ngOnInit() {
  	this.authenticationService.logout();
  }

}
