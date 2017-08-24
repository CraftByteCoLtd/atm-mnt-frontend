import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { AppConfigService } from './app-config.service';
import { AuthenticationService } from './authentication.service';
import { Part } from '../_models/part.model';
import { User } from '../_models/user.model';
import { Atm } from '../_models/atm.model';

@Injectable()
export class PartInventoryService {
  partChanged = new Subject<Part[]>();

  private part: Part[] = [
    new Part()
  ]


  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  getParts(): Observable<Part[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-part/parts'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  setListPart(part: Part[]) {
    this.part = part;
    this.partChanged.next(this.part.slice());
  }

  getListPart() {
    return this.part;
  }

  getPart(id: string): Observable<Part> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-part/part-info/' + id))
      .map((response) => {
        return response['part'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getPartType(): Observable<any> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-part/part-type'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getAtms(): Observable<Atm[]> {
    // get users from api
    return this.http.get(this.appConfig.getApiEndPoint('manage-part/part-atm-list'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  createPart(part: Part): Observable<Part> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-part/create'), part)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  updatePart(part: Part): Observable<Part> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-part/update'), part)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

}
