import { Component, OnInit, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DetailCategory } from '../../models';
import { TablesService } from '../../services';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  public form: FormGroup;
  loading: boolean = false;
  category: DetailCategory;
  loadingMain: boolean = true;
  srcResult;
  constructor(
    private service: TablesService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
    }
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fetchDetail();
  }
  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get description(): AbstractControl {
    return this.form.get('description')!;
  }
  onFileSelected(e) {
    this.srcResult = e.target.files[0];
  }
  public add(): void {
    if (this.form.valid) {
      const form = new FormData();
      form.append('name', this.name.value);
      form.append('description', this.description.value);
      form.append('image', this.srcResult);
      this.loading = true;
      this.service
        .updateCategory(form, this.data.id)
        .then((res) => {
          this.toastr.success('Update category successful');
          this.loading = false;
        })
        .catch((err) => {
          this.toastr.error('Something error, try again');
          this.loading = false;
        });
    } else {
      this.toastr.error('Something error');
    }
  }
  fetchDetail() {
    this.loading = true;
    this.service.getDetailCategory(this.data.id).then((res) => {
      const values = res.data.category;
      this.form = new FormGroup({
        name: new FormControl(values.name, [Validators.required]),
        description: new FormControl(values.description, [Validators.required]),
      });
      this.loading = false;
    });
  }
}
