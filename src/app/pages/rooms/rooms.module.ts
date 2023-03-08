import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { TablesPageComponent } from './containers';
import { TablesRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../../shared/shared.module';
// import { EmployeeTableComponent } from './components';
import { TablesService } from './services';
import { RoomsTableComponent } from './components/rooms-table/rooms-table.component';
// import { DetailUpdateComponent } from './components/detail-update/detail-update.component';

@NgModule({
  declarations: [
    TablesPageComponent,
    RoomsTableComponent,
    // EmployeeTableComponent,
    // DetailUpdateComponent,
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    SharedModule,
    MatDialogModule,
  ],
  providers: [TablesService],
})
export class TablesModule {}
