import { SessionService } from './session.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PathGuardComponent implements CanActivate {
    constructor(private session: SessionService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.session.isAuthenticated.pipe(map(Auth => {
            const isAuth = !!Auth;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));
    }
}