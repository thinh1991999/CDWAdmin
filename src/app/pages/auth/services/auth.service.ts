import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = new BehaviorSubject<User | null>(null);
  readonly _user$ = this._user.asObservable();
  private axios = axios.create({
    baseURL: 'http://localhost:8000',
  });
  private baseURl: string = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) {}
  public login(data: { email: string; password: string }): Promise<User> {
    return this.axios.post('/admin/login', data);
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith',
    });
  }
}
