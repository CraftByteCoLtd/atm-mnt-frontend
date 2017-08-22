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

@Injectable()
export class TechnicianTicketService {
  technicianTicketChanged = new Subject<TechnicianTicket[]>();

  private tts: TechnicianTicket[] = [
    new TechnicianTicket()
  ]


  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  getTechnicianTickets(): Observable<TechnicianTicket[]> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-tt/tts'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  setListTechnicianTicket(tts: TechnicianTicket[]) {
    this.tts = tts;
    this.technicianTicketChanged.next(this.tts.slice());
  }

  getListTechnicianTicket() {
    return this.tts;
  }

  getTechnicianTicket(id: string): Observable<TechnicianTicket> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-tt/tt-info/' + id))
      .map((response) => {
        return response['tt'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  createTechnicianTicket(tt: TechnicianTicket): Observable<TechnicianTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-tt/create'), tt)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  updateTechnicianTicket(tt: TechnicianTicket): Observable<TechnicianTicket> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-tt/update'), tt)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getResponsiblePersons(): Observable<User[]> {
    // get users from api
    return this.http.get(this.appConfig.getApiEndPoint('manage-tt/tt-name-list'))
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
    return this.http.get(this.appConfig.getApiEndPoint('manage-tt/tt-atm-list'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  getPartByAtmID(atm: Atm): Observable<Part[]> {

    return this.http.post(
      this.appConfig.getApiEndPoint('manage-tt/tt-part-list'), atm
    ).map((response) => {
      return response['data'];
    })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

}
