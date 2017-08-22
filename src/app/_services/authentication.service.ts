import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfigService } from './app-config.service';


@Injectable()
export class AuthenticationService {
   token: string;
   tokenLocalStorageKey: string;

   constructor(
      private http: Http,
      private appConfigService: AppConfigService) {
          this.tokenLocalStorageKey = this.appConfigService.getLocalStorageTokenAccKey();
      }

    login(username: string, password: string): Observable<any> {
        return this.http.post(this.appConfigService.getApiEndPoint('auth/login'),
            { userName: username, userPwd: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store token to localStorage
                    localStorage.setItem(this.tokenLocalStorageKey, token);

                    // return true if  successful
                    return response.json();
                } else {
                    // return false if failed
                    return response.json();
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem(this.tokenLocalStorageKey);
    }

}
