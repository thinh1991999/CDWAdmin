import { Component, OnInit, NgZone, Inject,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TablesService } from '../../services';
import { Amenity } from 'src/app/pages/amenities/models';
import { Category } from 'src/app/pages/categories/models';
import { GlobalService } from 'src/app/services/global.service';
import { PlaceType, PropertyType, RoomBooked } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomDetail } from '../../models/roomDetail';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  public form: FormGroup;
  loading: boolean = false;
  roomBooked: RoomBooked;
  statusData: string[] = [];

  constructor(
    private service: TablesService,
    private toastr: ToastrService,
    private global: GlobalService,
    private zone: NgZone,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
    }
  ) {
    this.statusData = this.service.getStatus();
    this.loading = true;
    this.service.getBooking(this.data.id).then((res) => {
      this.roomBooked = res.data.Booking;
      this.form = new FormGroup({
        status: new FormControl(res.data.Booking.status, [Validators.required]),
      });
      this.loading = false;
    });
  }

  async ngOnInit() {}

  clear() {}
  get status(): AbstractControl {
    return this.form.get('status')!;
  }
  public update(): void {
    this.loading=true;
    this.service.updateStatus(this.data.id, this.status.value).then((res)=>{
      this.dialogRef.close({ event: 'RELOAD', data: true });
      this.toastr.success('Update status successful');
      this.loading = false;
    })
  }

  public async fetch() {
    this.loading = true;
    this.service.getBooking(this.data.id).then((res) => {
      console.log(res);
    });
  }
}
