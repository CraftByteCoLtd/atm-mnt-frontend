import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { AppConfigService } from './app-config.service';
import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user.model';

@Injectable()
export class UserService {
  usersChange = new Subject<User[]>();

  private users: User[] = [
    new User()
  ]
  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  getUsers(): Observable<User[]> {
    // get users from api
    return this.http.get(this.appConfig.getApiEndPoint('manage-user/users'))
      .map((response) => {
        return response['data'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  setListUser(users: User[]) {
    this.users = users;
    this.usersChange.next(this.users.slice());
  }

  getListUser() {
    return this.users;
  }

  getUser(id: string): Observable<User> {
    return this.http.get(this.appConfig.getApiEndPoint('manage-user/user-info/' + id))
      .map((response) => {
        return response['user'];
      })
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  createUser(user: User): Observable<User> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-user/create'), user)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }

  updateUser(user: User): Observable<User> {
    return this.http.post(this.appConfig.getApiEndPoint('manage-user/update'), user)
      .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }


}
