import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { AppConfigService } from './app-config.service';
import { AuthenticationService } from './authentication.service';
import { Treasury } from '../_models/treasury.model';
import { User } from '../_models/user.model';

@Injectable()
export class TreasuryService {

 constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }


  getTreasuryInfo(): Observable<Treasury[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-treasury/treasuries'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }


   getTreasuryLatestLog(): Observable<any[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-treasury/treasury-log'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  updateTreasuryBalance(trs: any, fullName:string): Observable<any> {
    let trsUpdate:any = {
      treasuryBalance: trs.treasuryBalance,
      logType: 'update treasury',
      updatedBy: fullName
    }

    return this.http.post(this.appConfig.getApiEndPoint('manage-treasury/update'), trsUpdate)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

}