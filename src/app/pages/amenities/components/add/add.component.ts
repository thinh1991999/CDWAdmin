import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TablesService } from '../../services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public form: FormGroup;
  loading: boolean = false;
  srcResult;
  constructor(private service: TablesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
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
        .addAmenity(form)
        .then((res) => {
          this.name.setValue('');
          this.description.setValue('');
          this.srcResult = null;
          this.toastr.success('Add amenity successful');
          this.loading = false;
        })
        .catch((err) => {
          this.toastr.error('Something error, try again');
          this.loading = false;
        });
    }
  }
}
