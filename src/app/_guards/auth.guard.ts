import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppConfigService } from '../_services/app-config.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate{
  ACCESS_TOKEN_KEY:string;
  token:string;


  constructor(private router: Router,
    private jwtHelperService: JwtHelperService,
    private appConfig: AppConfigService) {

      this.ACCESS_TOKEN_KEY = this.appConfig.getLocalStorageTokenAccKey();
  }


  canActivate() {
    let activateStatus = false;
    this.token = localStorage.getItem(this.ACCESS_TOKEN_KEY);

    if (this.token && !this.jwtHelperService.isTokenExpired(this.token)) {
      // console.log('The token expired status :'+ this.jwtHelperService.isTokenExpired(this.token));
      // console.log('The token should be expired on : ' + this.jwtHelperService.getTokenExpirationDate(this.token));
      activateStatus = true;
    }

    if (!activateStatus) {
      this.router.navigate(['/login']);
    }
    return activateStatus;
  }
}
