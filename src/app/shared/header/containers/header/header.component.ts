import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Email, User } from '../../../../pages/auth/models';
import { AuthService, EmailService } from '../../../../pages/auth/services';
import { routes } from '../../../../consts';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user$: Observable<User>;
  public emails$: Observable<Email[]>;
  public routers: typeof routes = routes;

  constructor(
    private global: GlobalService,
    private authen: AuthService,
    private emailService: EmailService,
    private router: Router
  ) {
    this.user$ = this.global.getUser();
    this.emails$ = this.emailService.loadEmails();
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    // this.router.navigate([this.routers.LOGIN]);
    // this.global.logout();
    this.authen
      .signOut()
      .then((res) => {
        this.router.navigate([this.routers.LOGIN]);
        this.global.logout();
      })
      .catch(() => {
        this.router.navigate([this.routers.LOGIN]);
        this.global.logout();
      });
    // this.router.navigate([this.routers.LOGIN]);
  }
}
