import { Component, OnInit } from '@angular/core';
import {JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  decodedToken:any;
  fullName:string;
  isLoaded:boolean;
  constructor( private jwtHelperService:JwtHelperService) { }

  ngOnInit() {}
  ngDoCheck(){
     if(this.jwtHelperService.tokenGetter()){
      this.decodedToken = this.jwtHelperService.decodeToken();
      this.fullName = this.decodedToken.fullName;
      this.isLoaded = true;
      
    }
  }

}
