import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { AppConfigService } from './app-config.service';
import { AuthenticationService } from './authentication.service';
import { Atm } from '../_models/atm.model';

@Injectable()
export class AtmService {
  atmChange = new Subject<Atm[]>();

  private atms: Atm[] = [
    new Atm()
  ]
  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  getAtms(): Observable<Atm[]> {
    // get atms from api
    return this.http.get(this.appConfig.getApiEndPoint('manage-atm/atms'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  setListAtm(atms: Atm[]) {
    this.atms = atms;
    this.atmChange.next(this.atms.slice());
  }

  getListAtm() {
    return this.atms;
  }

  getAtm(id: string): Observable<Atm> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-atm/atm-info/' + id))
      .map((response) => {
        return response['atm'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  createAtm(atm: Atm): Observable<Atm> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-atm/create'), atm)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  updateAtm(atm: Atm): Observable<Atm> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-atm/update'), atm)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }


}
