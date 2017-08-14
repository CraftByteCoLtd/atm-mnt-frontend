import { Component, OnInit} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isCollapsed = false;
  decodedToken: any;
  isAdmin = false;
  isAtmVaulter = false;
  isAtmTechnician = false;
  isDispatcherManager = false;
  isWareHouseManager = false;

  constructor(
    private jwtHelperService: JwtHelperService) {}

  ngOnInit() {
    this.isCollapsed = true;

  }
  ngDoCheck() {
    if (this.jwtHelperService.tokenGetter()) {
      this.decodedToken = this.jwtHelperService.decodeToken();
      this.isAdmin = this.decodedToken.authRules.isAdmin;
      this.isAtmVaulter = this.decodedToken.authRules.isAtmVaulter;
      this.isAtmTechnician = this.decodedToken.authRules.isAtmTechnician;
      this.isDispatcherManager = this.decodedToken.authRules.isDispatcherManager;
      this.isWareHouseManager = this.decodedToken.authRules.isWareHouseManager;
    } else {
      this.isAdmin = false;
      this.isAtmVaulter = false;
      this.isAtmTechnician = false;
      this.isDispatcherManager = false;
      this.isWareHouseManager = false;
     }
  }
  collapsedMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

}
