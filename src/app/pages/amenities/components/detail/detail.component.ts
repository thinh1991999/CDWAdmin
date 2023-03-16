import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { DetailAmenity } from '../../models';
import { TablesService } from '../../services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  loading: boolean = true;
  amenity: DetailAmenity;
  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    private service: TablesService,
    public global: GlobalService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
    }
  ) {
    this.fetchDetail();
  }

  ngOnInit(): void {}

  fetchDetail() {
    this.loading = true;
    this.service.getDetailAmenity(this.data.id).then((res) => {
      this.amenity = res.data.amenity;
      this.loading = false;
    });
  }

  getTime(time: Date) {
    return this.global.getTimeDetail(time);
  }
}
