import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable, of } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

import { Room } from '../models';
import { Add } from '../models/add';

enum Status{
  PAYFULL = 1,
  PAYPART,
  DONE,
  REJECT,
  CANCER,
}

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  private token: string = '';
  private url = 'http://localhost:8000';
  private axios: AxiosInstance;
  constructor(private global: GlobalService) {
    this.global._token$.subscribe((token) => {
      this.token = token;
    });
    this.axios = axios.create({
      baseURL: this.global.getUrl(),
    });
  }

  public getRoomsBooking(): Promise<any> {
    return this.axios.get('/booking/all', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public getBooking(id: string): Promise<any> {
    return this.axios.get('/booking/detail', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        id,
      },
    });
  }

  public updateStatus(id: string, status: Status): Promise<any> {
    return this.axios.put(
      '/booking/status/update',
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          id,
        },
      }
    );
  }

  public getStatus() {
    return ['PAY_FULL', 'PAY_PART', 'DONE', 'CANCER', 'REJECT'];
  }
}
