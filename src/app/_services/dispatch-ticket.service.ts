import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import _ from 'lodash';

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
  SingleDispatchChanged = new Subject<DispatchTicket>();

  private dts: DispatchTicket[] = [
    new DispatchTicket()
  ]

  private dt: DispatchTicket = new DispatchTicket();


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

  setSingleDispatchTicket(dt: DispatchTicket) {
    this.dt = dt;
    this.SingleDispatchChanged.next(this.dt);
  }

  getSingleDispatchTicket() {
    return this.dt;
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

  doWithdrawDispatchTicket(withdrawItem: any): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/do-withdraw'), withdrawItem)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  doClosedDispatchTicket(closedItem: any): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/do-closed'), closedItem)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  doClosedTechicianTicket(ttItem: any): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/do-tt-solution'), ttItem)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }


  doRecievedDispatchTicket(recieveditem: any): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/do-recieved'), recieveditem)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  doUpdateBalanceDispatchTicket(updateData: any): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/do-updated-atm-balance'), updateData)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  doMarkCompletedDispatchTicket(competedData: any): Observable<DispatchTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-dt/do-mark-completed'), competedData)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getTechnicianTicketsByAtms(atmIDs: string[]): Observable<TechnicianTicket[]> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-tt/tt-list-by-atms'), { selectedAtmIDs: atmIDs })
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

  getAtmsByBalanceFilter(b: string, eid: string): Observable<Atm[]> {
    let editId = eid ? "&eid=" + eid : "";
    let bLimit = b ? b : "0";
    return this.http.get(this.appConfig.getApiEndPoint('manage-dt/atms-by-balance-not-yet-dispatch?b=' + bLimit + editId))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

}


