import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

import { Category } from '../models';

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

  public getCategories(): Promise<any> {
    return this.axios.get('/category/all');
  }

  public getDetailCategory(id: string): Promise<any> {
    return this.axios.get('/category/detail', {
      params: {
        id,
      },
    });
  }

  public addCategory(form: FormData) {
    return this.axios.post('/category', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public updateCategory(form: FormData, id: string) {
    return this.axios.put('/category/update', form, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        id,
      },
    });
  }

  public deleteCategory(id: string) {
    return this.axios.post(
      '/category/delete',
      { id },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
