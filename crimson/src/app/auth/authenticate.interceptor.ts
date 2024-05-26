import { Injectable, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { DOCUMENT } from '@angular/common';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor  {
  localStorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.localStorage?.getItem('token');

    if (token) {
      const authReq = req.clone({
        setHeaders: { ContentType: 'application/json', Authorization: `Bearer ${token}` },
      });
      return next.handle(authReq);
    }
    else {
      const authReq = req.clone({
        setHeaders: { ContentType: 'application/json' },
      });
      return next.handle(authReq);
    }
  }
};
