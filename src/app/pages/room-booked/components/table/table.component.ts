import {
  Component,
  Input,
  OnInit,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

import { Room, RoomBooked } from '../../models/room';
import { MatDialog } from '@angular/material/dialog';
import { SelectModalComponent } from 'src/app/shared/select-modal/select-modal.component';
import { TablesService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { DetailComponent } from '../detail/detail.component';
import { UpdateComponent } from '../update/update.component';
import { GlobalService } from 'src/app/services/global.service';
// import { DetailUpdateComponent } from '../detail-update/detail-update.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class RoomsTableComponent implements OnInit {
  @Input() amenityTableData: RoomBooked[];
  @Output() triggerReload: EventEmitter<boolean> = new EventEmitter();
  public displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'pricePerNight',
    'images',
    'status',
    'actions',
  ];
  public dataSource: MatTableDataSource<RoomBooked>;
  public selection = new SelectionModel<RoomBooked>(true, []);
  public isShowFilterInput = false;
  loadings: string[] = [];
  statusData: string[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public modal: MatDialog,
    private service: TablesService,
    private toast: ToastrService,
    private global: GlobalService
  ) {
    this.statusData = this.service.getStatus();
  }
  public ngOnInit(): void {
    console.log(this.amenityTableData);
    this.dataSource = new MatTableDataSource<RoomBooked>(this.amenityTableData);
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.amenityTableData = changes.amenityTableData.currentValue;
    this.dataSource = new MatTableDataSource<RoomBooked>(this.amenityTableData);
    this.dataSource.paginator = this.paginator;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public formatTime(vl): string {
    return this.global.getTimeDetail(vl);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<RoomBooked>(this.amenityTableData);
  }

  handleUpdateStatus(id: string) {
    let dialogRef = this.modal.open(UpdateComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'RELOAD') {
        this.triggerReload.emit(result.data);
      }
    });
  }

  handleChange(e){
    if(!e.value){
      this.dataSource = new MatTableDataSource<RoomBooked>(
        this.amenityTableData
      );
    }else{
      const newData = this.amenityTableData.filter((vl) => vl.status === e.value);
      this.dataSource = new MatTableDataSource<RoomBooked>(newData);
    }
  }

  handleUpdate(id: string) {
    console.log(id);

    // let dialogRef = this.modal.open(UpdateComponent, {
    //   data: { id },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result.event === 'RELOAD') {
    //     this.triggerReload.emit(result.data);
    //   }
    // });
  }

  handleDelete(id: string) {
    let dialogRef = this.modal.open(SelectModalComponent, {
      data: {
        title: 'Delete room',
        sub: 'Are you sure to delete this room?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result === true) {
      //   this.loadings.push(id);
      //   this.service
      //     .deleteCategory(id)
      //     .then((res) => {
      //       this.toast.success('Delete category successful');
      //       this.triggerReload.emit(true);
      //     })
      //     .catch((err) => {
      //       this.toast.error('Something error, try again');
      //     });
      //   // this.triggerReload.emit(true);
      // }
    });
  }

  handleReloadMainData(status: boolean) {}
}
