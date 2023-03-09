import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.css'],
})
export class SelectModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  constructor(
    public dialogRef: MatDialogRef<SelectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
