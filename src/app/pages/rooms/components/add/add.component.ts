import { Component, OnInit, NgZone } from '@angular/core';
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
  loadingImg: boolean = false;
  loadingImgsDelete: string[] = [];
  amenitiesArr: Amenity[] = [];
  categoriesArr: Category[] = [];
  imgs: {
    publicUrl: string;
    hint: string;
  }[] = [];

  title: string = '123';
  srcResult;
  constructor(
    private service: TablesService,
    private toastr: ToastrService,
    private global: GlobalService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.fetch();
    const values = this.service.getAddValues();
    console.log(values);
    if (values === null) {
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
        propertyType: new FormControl(null || 'Private room', null),
        amenities: new FormControl([], null),
        categories: new FormControl([], null),
        images: new FormControl([], null),
      });
    } else {
      const {
        name,
        description,
        pricePerNight,
        guests,
        bedrooms,
        livingRooms,
        beds,
        baths,
        latitude,
        longitude,
        address,
        propertyType,
        amenities,
        categories,
        images,
      } = values;
      this.form = new FormGroup({
        name: new FormControl(name, [Validators.required]),
        description: new FormControl(description, [Validators.required]),
        pricePerNight: new FormControl(pricePerNight, [Validators.required]),
        guests: new FormControl(guests, [Validators.required]),
        bedrooms: new FormControl(bedrooms, [Validators.required]),
        livingRooms: new FormControl(livingRooms, [Validators.required]),
        beds: new FormControl(beds, [Validators.required]),
        baths: new FormControl(baths, [Validators.required]),
        latitude: new FormControl(latitude, [Validators.required]),
        longitude: new FormControl(longitude, [Validators.required]),
        address: new FormControl(address, [Validators.required]),
        propertyType: new FormControl(propertyType || 'Private room', null),
        amenities: new FormControl(amenities || [], null),
        categories: new FormControl(categories || [], null),
        images: new FormControl(images || [], null),
      });
    }
    this.form.valueChanges.subscribe((values) => {
      this.service.saveAddValues(values);
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

  get images(): AbstractControl {
    return this.form.get('images')!;
  }

  checkErrorImages() {
    if (this.images.value.length < 5) {
      this.images.setErrors({
        length: true,
      });
      return false;
    }
    return true;
  }

  getLoadingImgDele(hint: string) {
    return this.loadingImgsDelete.includes(hint);
  }

  handleChangeCategories(event, id) {
    if (event.checked) {
      const newValue = [...this.categories.value, id];
      this.categories.setValue(newValue);
    } else {
      const newValue = [...this.categories.value];
      const idx = newValue.findIndex((idd) => idd === id);
      if (idx !== -1) {
        newValue.splice(idx, 1);
        this.categories.setValue(newValue);
      }
    }
    this.categories.setErrors(null);
  }

  getCheckCategories(id) {
    return this.categories.value.includes(id);
  }

  handleChangeAmenities(event, id) {
    if (event.checked) {
      const newValue = [...this.amenities.value, id];
      this.amenities.setValue(newValue);
    } else {
      const newValue = [...this.amenities.value];
      const idx = newValue.findIndex((idd) => idd === id);
      if (idx !== -1) {
        newValue.splice(idx, 1);
        this.amenities.setValue(newValue);
      }
    }
    this.amenities.setErrors(null);
  }

  getCheckAmenities(id) {
    return this.amenities.value.includes(id);
  }

  onFileSelected(e) {
    this.srcResult = e.target.files[0];
  }
  checkAmenAndCate() {
    if (this.amenities.value.length < 1) {
      this.amenities.setErrors({
        length: true,
      });
      return false;
    }
    if (this.categories.value.length < 1) {
      this.categories.setErrors({
        length: true,
      });
      return false;
    }
    return true;
  }

  handleImg(e: Event) {
    this.images.setErrors(null);
    const target = e.target as HTMLInputElement;
    const file = target.files[0];
    if (this.global.validateImage(file.type)) {
      const formData = new FormData();
      formData.append('image', file);
      this.loadingImg = true;
      this.service
        .createImg(formData)
        .then((res) => {
          const imgs = [...this.images.value];
          imgs.push(res.data.url);
          this.images.setValue(imgs);
          this.loadingImg = false;
          target.value = null;
        })
        .catch((err) => {
          this.toastr.error(err.response.data.error || 'Something error');
          target.value = null;
        });
    } else {
      this.toastr.error('Only images are valid');
      target.value = null;
    }
  }

  handleDeleteImg(img) {
    const hint = img.hint;
    this.loadingImgsDelete.push(hint);
    this.service
      .removeImg(hint)
      .then((res) => {
        const idxDel = this.loadingImgsDelete.findIndex((vl) => vl === hint);
        this.loadingImgsDelete.splice(idxDel, 1);
        const imgs = this.images.value;
        const idxImg = imgs.findIndex((img) => img.hint === hint);
        imgs.splice(idxImg, 1);
        this.images.setValue(imgs);
      })
      .catch((err) => {
        const imgs = this.images.value;
        const idxImg = imgs.findIndex((img) => img.hint === hint);
        imgs.splice(idxImg, 1);
        this.images.setValue(imgs);
      });
  }

  public add(): void {
    if (this.form.valid && this.checkAmenAndCate() && this.checkErrorImages()) {
      console.log(this.form.value);
      this.loading = true;
      this.service
        .createRoom(this.form.value)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
