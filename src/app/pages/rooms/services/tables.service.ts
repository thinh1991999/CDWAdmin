import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

import { Room } from '../models';
import { Add } from '../models/add';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  private token: string = '';
  private url = 'http://localhost:8000';
  constructor(private global: GlobalService) {
    this.global._token$.subscribe((token) => {
      this.token = token;
    });
  }

  public createRoom(data: Add): Promise<any> {
    return axios.post(this.url + '/room/create', data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public getRooms(): Promise<any> {
    return axios.get(this.url + '/room/all');
  }

  public getCategories(): Promise<any> {
    return axios.get(this.url + '/category/all');
  }

  public getAmenities(): Promise<any> {
    return axios.get(this.url + '/amenity/all');
  }

  public createImg(data): Promise<any> {
    return axios.post(this.url + '/room/image/single', data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public removeImg(hint: string): Promise<any> {
    return axios.post(
      this.url + '/room/image/delete',
      {
        url: hint,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  public saveAddValues(data: Add) {
    localStorage.setItem('add_room', JSON.stringify(data));
  }

  public getAddValues(): Add {
    return JSON.parse(localStorage.getItem('add_room'));
  }

  public clearAddvalues() {
    localStorage.removeItem('add_room');
  }

  // public addCategory(form: FormData) {
  //   return axios.post('http://localhost:8000/category', form, {
  //     headers: {
  //       Authorization: `Bearer ${this.token}`,
  //     },
  //   });
  // }

  // public deleteCategory(id: string) {
  //   return axios.post(
  //     'http://localhost:8000/category/delete',
  //     { id },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     }
  //   );
  // }
}
