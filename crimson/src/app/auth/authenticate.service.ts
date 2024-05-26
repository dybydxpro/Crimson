import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  localStorage: Storage | undefined;
  token: any;

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.localStorage = document.defaultView?.localStorage;
    this.token = this.localStorage?.getItem('token') || null;
  }

  isLoggedIn(): boolean {
    try { 
      return this.token ? true : false;
    } catch(e: any) {
      console.error(e);
      return false;
    }
  }
}
