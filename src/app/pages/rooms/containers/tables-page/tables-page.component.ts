import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TablesService } from '../../services';
import { Room } from '../../models';
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
  public amenityTableData$: Room[] = [];
  amenities: Amenity[] = [];
  categories: Category[] = [];
  loading: boolean = false;
  constructor(private service: TablesService, public addUsermodal: MatDialog) {
    this.reload();
  }

  openAddModal(): void {
    const dialogRef = this.addUsermodal.open(AddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'RELOAD') {
        this.reload();
      }
    });
  }
  reload() {
    this.loading = true;
    this.service
      .getRooms()
      .then((res) => {
        this.amenityTableData$ = res.data.result.docs;
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
    console.log(status);

    if (status) {
      this.reload();
    }
  }
}
