import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'

})
export class AuthenticateGuard implements CanActivate {

  constructor(private authenticateService: AuthenticateService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { // 
    if (!this.authenticateService.isLoggedIn()) {
      this.router.navigate(['/sign-in']); 
        return false;
    }
    else {
      return true;
    }
  }
}