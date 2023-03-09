import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TablesPageComponent } from './containers';
import { TablesRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { EmployeeTableComponent } from './components';
import { TablesService } from './services';
import { RoomsTableComponent } from './components/table/table.component';
import { AddComponent } from './components/add/add.component';
// import { DetailUpdateComponent } from './components/detail-update/detail-update.component';

@NgModule({
  declarations: [
    TablesPageComponent,
    RoomsTableComponent,
    AddComponent,
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
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [TablesPageComponent],
  providers: [TablesService],
})
export class TablesModule {}
