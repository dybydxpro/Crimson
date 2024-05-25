import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  localStorage: Storage | undefined;
  token: any = "";

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.localStorage = document.defaultView?.localStorage;
    this.token = this.localStorage?.getItem('token') || "";
  }

  isLoggedIn(): boolean {
    // const token: string = this.token;
    // const payload = atob(token.split('.')[1] || "e30=");
    // const parsedPayload = JSON.parse(payload);
    // return parsedPayload.exp > Date.now() / 1000;
    return true;
  }
}
