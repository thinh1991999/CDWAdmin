import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

import { Room } from '../models';

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

  public getRooms(): Promise<any> {
    return axios.get('http://localhost:8000/room/all');
  }

  public getCategories(): Promise<any> {
    return axios.get('http://localhost:8000/category/all');
  }

  public getAmenities(): Promise<any> {
    return axios.get('http://localhost:8000/amenity/all');
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
