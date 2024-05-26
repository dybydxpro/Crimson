import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.localStorage = document.defaultView?.localStorage;
  }

  getItem(name: string): any {
    return this.localStorage?.getItem(name);
  }

  setItem(name: string, value: string): any {
    return this.localStorage?.setItem(name, value);
  }

  removeItem(name: string): any {
    return this.localStorage?.removeItem(name);
  }

  clear(): any {
    return this.localStorage?.clear();
  }
}
