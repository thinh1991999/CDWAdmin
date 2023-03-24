import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { routes } from '../../../consts';
import { GlobalService } from 'src/app/services/global.service';
import { User } from '../models';

@Injectable()
export class AuthGuard implements CanActivate {
  public routers: typeof routes = routes;
  public user: User;
  public token: string;

  constructor(private router: Router, private global: GlobalService) {
    this.global._user$.subscribe((user) => {
      this.user = user;
    });
    this.global._token$.subscribe((token) => {
      this.token = token;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user && this.token) {
      return true;
    } else {
      this.router.navigate([this.routers.LOGIN]);
    }
  }
}
