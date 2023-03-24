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
  private axios;
  constructor(private global: GlobalService) {
    this.global._token$.subscribe((token) => {
      this.token = token;
    });
    this.axios = axios.create({
      baseURL: this.global.getUrl(),
    });
  }

  public getAnenities(): Promise<any> {
    return this.axios.get('/amenity/all');
  }

  public addAmenity(form: FormData) {
    console.log(this.token);
    return this.axios.post('/amenity', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public getDetailAmenity(id: string): Promise<any> {
    return this.axios.get('/amenity/detail', {
      params: {
        id,
      },
    });
  }

  public deleteAmenity(id: string) {
    return this.axios.delete('/amenity/delete', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        id,
      },
    });
  }

  public updateAmenity(form: FormData, id: string) {
    return this.axios.put('/amenity/update', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        id,
      },
    });
  }
}
