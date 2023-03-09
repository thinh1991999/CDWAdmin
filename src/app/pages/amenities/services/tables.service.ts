import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

import { Amenity } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  private token: string = '';
  constructor(private global: GlobalService) {
    this.global._token$.subscribe((token) => {
      this.token = token;
    });
  }

  public getAnenities(): Promise<any> {
    return axios.get('http://localhost:8000/amenity/all');
  }

  public addAmenity(form: FormData) {
    console.log(this.token);
    return axios.post('http://localhost:8000/amenity/update', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
