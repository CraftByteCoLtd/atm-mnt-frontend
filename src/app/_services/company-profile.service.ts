import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { AppConfigService } from './app-config.service';
import { AuthenticationService } from './authentication.service';
import { CompanyProfile } from '../_models/company-profile.model';


@Injectable()
export class CompanyProfileService {

  companyProfileChange = new Subject<CompanyProfile[]>();

  private companyProfiles: CompanyProfile[] = [
    new CompanyProfile()
  ]

  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getCompanyProfiles(): Observable<CompanyProfile[]> {
    // get companyProfiles from api
    return this.http.get(this.appConfig.getApiEndPoint('manage-company/companies'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  setListCompanyProfile(companyProfiles: CompanyProfile[]) {
    this.companyProfiles = companyProfiles;
    this.companyProfileChange.next(this.companyProfiles.slice());
  }

  getListCompanyProfile() {
    return this.companyProfiles;
  }

  getCompanyProfile(id: string): Observable<CompanyProfile> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-company/company/' + id))
      .map((response) => {
        return response['company'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  createCompanyProfile(company: CompanyProfile): Observable<CompanyProfile> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-company/create'), company)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  updateCompanyProfile(company: CompanyProfile): Observable<CompanyProfile> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-company/update'), company)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  
  uploadCsv(formData: any): Observable<any> {
    let frmData:any = formData;

    return this.http.post(this.appConfig.getApiEndPoint('manage-upload/upload-photo'), frmData)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }  



}

