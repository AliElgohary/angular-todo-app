import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuardService canActivate method called.');
    if (this.authService.isUserLogged) {
      console.log('User is logged in. Allowing navigation.');
      return true;
    } else {
      console.log('User is not logged in. Redirecting to login page.');
      return this.router.createUrlTree(['/login']);
    }
  }
}
