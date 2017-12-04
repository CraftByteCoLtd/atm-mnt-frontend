import { Component, OnInit , OnDestroy} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyProfile } from '../_models/company-profile.model';
import { AlertService } from '../_services/alert.service';
import { CompanyProfileService } from '../_services/company-profile.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  decodedToken: any;
  fullName: string;
  isLoaded: boolean;
  companyProfile: CompanyProfile;
  profileSubscription: Subscription;


  constructor(private jwtHelperService: JwtHelperService, private companyProfileService: CompanyProfileService) { }

  ngOnInit() {
      this.getCompanyProfile(); }

  ngDoCheck() {
    if (this.jwtHelperService.tokenGetter()) {
      this.decodedToken = this.jwtHelperService.decodeToken();
      this.fullName = this.decodedToken.fullName;
      this.isLoaded = true;

    }
  }

  getCompanyProfile() {
    this.profileSubscription = this.companyProfileService.getCompanyProfiles()
      .subscribe(response => {
        this.companyProfile = response[0];
        console.log(this.companyProfile);
      },
      error => console.log(error));
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }


}
