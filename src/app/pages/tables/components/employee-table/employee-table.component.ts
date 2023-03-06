import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DetailUpdateComponent } from '../detail-update/detail-update.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  @Input() employeeTableData: User[];
  public displayedColumns: string[] = [
    'select',
    'avatar',
    'name',
    'email',
    'phone',
    'bio',
    'actions',
  ];
  public dataSource: MatTableDataSource<User>;
  public selection = new SelectionModel<User>(true, []);

  public isShowFilterInput = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public modal: MatDialog) {}
  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<User>(this.employeeTableData);

    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
    this.dataSource = new MatTableDataSource<User>(this.employeeTableData);
  }

  handleDetail(id: string) {
    this.modal.open(DetailUpdateComponent, {
      data: { id },
    });
  }
}
