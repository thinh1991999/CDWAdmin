import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TablesService } from '../../services';
import { Room, RoomBooked } from '../../models';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddComponent } from '../../components/add/add.component';
import { Amenity } from 'src/app/pages/amenities/models';
import { Category } from 'src/app/pages/categories/models';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-tables-room',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss'],
})
export class TablesPageComponent {
  public amenityTableData$: RoomBooked[] = [];
  amenities: Amenity[] = [];
  categories: Category[] = [];
  loading: boolean = false;
  statusData: string[] = [];
  constructor(private service: TablesService, public addUsermodal: MatDialog) {
    this.reload();
  }

  openAddModal(): void {
    const dialogRef = this.addUsermodal.open(AddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  reload() {
    this.loading = true;
    this.service
      .getRoomsBooking()
      .then((res) => {
        this.amenityTableData$ = res.data.bookings;
        this.loading = false;
      })
      .catch((err) => {
        this.amenityTableData$ = [];
        this.loading = false;
      });
  }
  handleRefresh() {
    this.reload();
  }
  trigger(status: boolean) {
    if (status) {
      this.reload();
    }
  }
}
