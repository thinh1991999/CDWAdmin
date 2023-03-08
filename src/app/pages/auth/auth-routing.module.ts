import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPageComponent } from './containers';
import { GlobalService } from 'src/app/services/global.service';
import { routes } from '../../consts';

const routesC: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesC)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  public routers: typeof routes = routes;
  constructor(private global: GlobalService, private router: Router) {
    this.global._user$.subscribe((user) => {
      if (user) {
        this.router.navigate([this.routers.DASHBOARD]).then();
      }
    });
  }
}
