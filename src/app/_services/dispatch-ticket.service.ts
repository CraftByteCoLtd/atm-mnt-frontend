import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { AppConfigService } from './app-config.service';
import { AuthenticationService } from './authentication.service';
import { TechnicianTicket } from '../_models/technician-ticket.model';
import { User } from '../_models/user.model';
import { Atm } from '../_models/atm.model';
import { Part } from '../_models/part.model';
import { DispatchTicket } from '../_models/dispatch-ticket.model';

@Injectable()
export class DispatchTicketService {
  DispatchTicketChanged = new Subject<DispatchTicket[]>();

  private dts: DispatchTicket[] = [
    new DispatchTicket()
  ]


  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  getDispatchTickets(): Observable<DispatchTicket[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-dt/dts'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getActiveDispatchTickets(): Observable<DispatchTicket[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-dt/active-dts'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }


  setListDispatchTicket(dts: DispatchTicket[]) {
    this.dts = dts;
    this.DispatchTicketChanged.next(this.dts.slice());
  }

  getListDispatchTicket() {
    return this.dts;
  }

  getDispatchTicket(id: string): Observable<DispatchTicket> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-dt/dt-info/' + id))
      .map((response) => {
        return response['dt'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  createDispatchTicket(dt: DispatchTicket): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/create'), dt)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }
  
  updateDispatchTicket(dt: DispatchTicket): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/update'), dt)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getTechnicianTicketsByAtms(atmIDs:string[]): Observable<TechnicianTicket[]> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-tt/tt-list-by-atms'),{selectedAtmIDs: atmIDs})
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getResponsiblePersons(): Observable<User[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-dt/dt-vaulter-list'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getAtmsByBalanceFilter(b: string,eid: string): Observable<Atm[]> {
    let editId = eid ? "&eid="+eid : "";
    let bLimit = b ? b:"0";
    return this.http.get(this.appConfig.getApiEndPoint('manage-dt/atms-by-balance-not-yet-dispatch?b='+bLimit + editId))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

}
