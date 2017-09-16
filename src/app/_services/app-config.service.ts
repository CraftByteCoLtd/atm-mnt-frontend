import { Injectable } from '@angular/core';

// URL follow by one slash '/' ex: http://url:port/
const API_BASE_URL = 'http://130.211.135.58:3000/';
// const API_BASE_URL: string = 'http://127.0.0.1:3000/';
const LOCAL_STR_TOKEN_ACCSS_KEY: string = 'access_token';

@Injectable()
export class AppConfigService {
  constructor() { }

  getApiBaseUrl() {
    return API_BASE_URL;
  }

  getApiEndPoint(routePath: string) {
    return API_BASE_URL + routePath;
  }

  getLocalStorageTokenAccKey() {
    return LOCAL_STR_TOKEN_ACCSS_KEY;
  }

}
