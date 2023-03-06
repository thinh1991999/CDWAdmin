import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TablesService } from '../../services';
import { Customer, User } from '../../models';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss'],
})
export class TablesPageComponent {
  public employeeTableData$: Observable<User[]>;
  // public materialTableData$: Observable<Customer[]>

  constructor(private service: TablesService, public addUsermodal: MatDialog) {
    this.employeeTableData$ = service.loadEmployeeTableData();
    // this.materialTableData$ = service.loadMaterialTableData();
  }
  openAddUserModal(): void {
    const dialogRef = this.addUsermodal.open(AddUserComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'add-user.component',
  templateUrl: 'add-user.component.html',
})
export class AddUserComponent {
  constructor(
    public ref: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.ref.close();
  }
}
