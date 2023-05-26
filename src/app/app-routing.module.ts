import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard, LoginGuard } from './pages/auth/guards';

const routes: Routes = [
  {
    path: 'amenities',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/amenities/amenities.module').then((m) => m.TablesModule),
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/rooms/rooms.module').then((m) => m.TablesModule),
  },
  {
    path: 'typography',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/typography/typography.module').then(
        (m) => m.TypographyModule
      ),
  },
  {
    path: 'tables',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesModule),
  },
  {
    path: 'rooms',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/rooms/rooms.module').then((m) => m.TablesModule),
  },
  {
    path: 'rooms-booked',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/room-booked/room-booked.module').then(
        (m) => m.TablesModule
      ),
  },
  {
    path: 'categories',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.TablesModule
      ),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
