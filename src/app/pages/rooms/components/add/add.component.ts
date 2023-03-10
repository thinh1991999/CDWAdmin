import { Component, OnInit } from '@angular/core';
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

function validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // if (control.value.length < 1) {
    //   return { length: control.value };
    // }
    return {
      abc: control.value,
    };
  };
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public form: FormGroup;
  loading: boolean = false;
  amenitiesArr: Amenity[] = [];
  categoriesArr: Category[] = [];
  srcResult;
  constructor(private service: TablesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetch();
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      pricePerNight: new FormControl(null, [Validators.required]),
      guests: new FormControl(null, [Validators.required]),
      bedrooms: new FormControl(null, [Validators.required]),
      livingRooms: new FormControl(null, [Validators.required]),
      beds: new FormControl(null, [Validators.required]),
      baths: new FormControl(null, [Validators.required]),
      latitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      propertyType: new FormControl('Private room', null),
      amenities: new FormControl([], null),
      categories: new FormControl([], null),
    });
  }
  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get description(): AbstractControl {
    return this.form.get('description')!;
  }
  get pricePerNight(): AbstractControl {
    return this.form.get('pricePerNight')!;
  }
  get guests(): AbstractControl {
    return this.form.get('guests')!;
  }
  get bedrooms(): AbstractControl {
    return this.form.get('bedrooms')!;
  }
  get beds(): AbstractControl {
    return this.form.get('beds')!;
  }
  get baths(): AbstractControl {
    return this.form.get('baths')!;
  }
  get latitude(): AbstractControl {
    return this.form.get('latitude')!;
  }
  get longitude(): AbstractControl {
    return this.form.get('longitude')!;
  }
  get address(): AbstractControl {
    return this.form.get('address')!;
  }
  get livingRooms(): AbstractControl {
    return this.form.get('livingRooms')!;
  }
  get amenities(): AbstractControl {
    return this.form.get('amenities')!;
  }
  get categories(): AbstractControl {
    return this.form.get('categories')!;
  }

  handleChangeCategories(event, id) {
    if (event.checked) {
      this.categories.value.push(id);
    } else {
      const idx = this.categories.value.findIndex((idd) => idd === id);
      if (idx !== -1) {
        this.categories.value.splice(idx, 1);
      }
    }
  }

  getCheckCategories(id) {
    return this.categories.value.includes(id);
  }

  handleChangeAmenities(event, id) {
    if (event.checked) {
      this.amenities.value.push(id);
    } else {
      const idx = this.amenities.value.findIndex((idd) => idd === id);
      if (idx !== -1) {
        this.amenities.value.splice(idx, 1);
      }
    }
    this.amenities.setErrors({
      length: false,
    });
  }

  getCheckAmenities(id) {
    return this.categories.value.includes(id);
  }

  onFileSelected(e) {
    this.srcResult = e.target.files[0];
  }
  checkAmenAndCate() {
    if (this.amenities.value.length < 1) {
      this.amenities.setErrors({
        length: true,
      });
    }
    if (this.categories.value.length < 1) {
      this.categories.setErrors({
        length: true,
      });
    }
  }
  public add(): void {
    this.checkAmenAndCate();
    if (this.form.valid) {
      // const form = new FormData();
      // form.append('name', this.name.value);
      // form.append('description', this.description.value);
      // form.append('image', this.srcResult);
      // this.loading = true;
      // this.service
      //   .addCategory(form)
      //   .then((res) => {
      //     this.name.setValue('');
      //     this.description.setValue('');
      //     this.srcResult = null;
      //     this.toastr.success('Add category successful');
      //     this.loading = false;
      //   })
      //   .catch((err) => {
      //     this.toastr.error('Something error, try again');
      //     this.loading = false;
      //   });
    }
  }

  public async fetch() {
    this.loading = true;
    const call1 = this.service.getAmenities();
    const call2 = this.service.getCategories();
    Promise.all([call1, call2])
      .then((res) => {
        const [res1, res2] = res;
        this.amenitiesArr = res1.data.amenities;
        this.categoriesArr = res2.data.categories;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
