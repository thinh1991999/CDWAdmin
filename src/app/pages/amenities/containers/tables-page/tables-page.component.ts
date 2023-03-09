import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TablesService } from '../../services';
import { Amenity } from '../../models';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddComponent } from '../../components/add/add.component';
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
  public amenityTableData$: Amenity[] = [];
  loading: boolean = true;
  // public materialTableData$: Observable<Customer[]>

  constructor(private service: TablesService, public addUsermodal: MatDialog) {
    // this.loading = true;
    // service.getAnenities().then((res) => {
    //   this.amenityTableData$ = res.data.aminities;
    //   this.loading = false;
    // });
  }
  openAddModal(): void {
    const dialogRef = this.addUsermodal.open(AddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

// @Component({
//   selector: 'add-user.component',
//   templateUrl: 'add-user.component.html',
// })
// export class AddUserComponent {
//   constructor(
//     public ref: MatDialogRef<AddUserComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) {}

//   onNoClick(): void {
//     this.ref.close();
//   }
// }
