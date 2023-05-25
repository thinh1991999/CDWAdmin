import { Component, OnInit, NgZone, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Amenity } from 'src/app/pages/amenities/models';
import { Category } from 'src/app/pages/categories/models';
import { GlobalService } from 'src/app/services/global.service';
import { PlaceType, PropertyType } from '../../models';
import { RoomDetail } from '../../models/roomDetail';
import { TablesService } from '../../services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public form: FormGroup;
  loading: boolean = false;
  loadingImg: boolean = false;
  loadingImgsDelete: string[] = [];
  countries: {
    name: string;
    code: string;
  }[] = [];
  amenitiesArr: Amenity[] = [];
  categoriesArr: Category[] = [];
  placeTypeArr: PlaceType[] = [];
  propertyArr: PropertyType[] = [];
  imgs: {
    publicUrl: string;
    hint: string;
  }[] = [];
  srcResult;
  constructor(
    private service: TablesService,
    private toastr: ToastrService,
    private global: GlobalService,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
    }
  ) {}

  ngOnInit() {
    this.fetch();
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
  get livings(): AbstractControl {
    return this.form.get('livings')!;
  }
  get propertyType(): AbstractControl {
    return this.form.get('propertyType')!;
  }
  get placeType(): AbstractControl {
    return this.form.get('placeType')!;
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

  handleChangeCategories(event, id) {
    return
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
    return
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
    console.log(file);

    if (this.global.validateImage(file.type)) {
      const formData = new FormData();
      formData.append('image', file);
      this.loadingImg = true;

    } else {
      this.toastr.error('Only images are valid');
      target.value = null;
    }
  }

  handleDeleteImg(img) {
    const hint = img.hint;
    // this.loadingImgsDelete.push(hint);
    // this.service
    //   .removeImg(hint)
    //   .then((res) => {
    //     const idxDel = this.loadingImgsDelete.findIndex((vl) => vl === hint);
    //     this.loadingImgsDelete.splice(idxDel, 1);
    //     const imgs = this.images.value;
    //     const idxImg = imgs.findIndex((img) => img.hint === hint);
    //     imgs.splice(idxImg, 1);
    //     this.images.setValue(imgs);
    //   })
    //   .catch((err) => {
    //     const imgs = this.images.value;
    //     const idxImg = imgs.findIndex((img) => img.hint === hint);
    //     imgs.splice(idxImg, 1);
    //     this.images.setValue(imgs);
    //   });
    const imgs = this.images.value;
    const idxImg = imgs.findIndex((img) => img.hint === hint);
    imgs.splice(idxImg, 1);
    this.images.setValue(imgs);
  }

  clear() {
    this.name.setValue('');
    this.description.setValue('');
    this.pricePerNight.setValue('');
    this.guests.setValue('');
    this.bedrooms.setValue('');
    this.livings.setValue('');
    this.beds.setValue('');
    this.baths.setValue('');
    this.latitude.setValue('');
    this.longitude.setValue('');
    this.address.setValue('');
    this.propertyType.setValue('Private room');
    this.amenities.setValue([]);
    this.categories.setValue([]);
    this.images.setValue([]);
  }

  public add(): void {
    if (this.form.valid && this.checkAmenAndCate() && this.checkErrorImages()) {
      this.loading = true;

    }
  }

  public async fetch() {

  }
}
