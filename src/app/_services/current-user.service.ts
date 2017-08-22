import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class CurrentUserService {
  decodedToken:any;
  constructor(
    private jwtHelperService: JwtHelperService) {
  }


  getCurrentUserInfo(){
    if (this.jwtHelperService.tokenGetter()) {
      this.decodedToken = this.jwtHelperService.decodeToken();
    }
    return this.decodedToken;
  }

}
