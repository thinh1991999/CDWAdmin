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
    return axios.post('http://localhost:8000/amenity', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public getDetailAmenity(id: string): Promise<any> {
    return axios.get('http://localhost:8000/amenity/detail', {
      params: {
        id,
      },
    });
  }

  public deleteAmenity(id: string) {
    return axios.delete('http://localhost:8000/amenity/delete', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        id,
      },
    });
  }

  public updateAmenity(form: FormData, id: string) {
    return axios.put('http://localhost:8000/amenity/update', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        id,
      },
    });
  }
}
