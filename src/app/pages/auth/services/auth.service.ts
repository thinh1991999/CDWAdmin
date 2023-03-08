import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import axios, { AxiosHeaders, AxiosProxyConfig } from 'axios';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = new BehaviorSubject<User | null>(null);
  readonly _user$ = this._user.asObservable();
  private axios = axios.create({
    baseURL: 'http://localhost:8000',
  });
  private token: string;
  private baseURl: string = 'http://localhost:8000';
  constructor(private httpClient: HttpClient, private global: GlobalService) {
    this.global._token$.subscribe((token) => {
      this.token = token;
    });
  }
  public login(data: { email: string; password: string }): Promise<any> {
    return this.axios.post('/admin/login', data);
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): Promise<any> {
    return this.axios.post('/admin/me/logout', null, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith',
    });
  }
}
