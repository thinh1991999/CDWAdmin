import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../pages/auth/models';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private readonly _user = new BehaviorSubject<User | null>(null);
  readonly _user$ = this._user.asObservable();
  private readonly _token = new BehaviorSubject<string | null>(null);
  readonly _token$ = this._token.asObservable();
  constructor() {
    const { user, token } = this.getAuthenStorage();
    if (user && token) {
      this._user.next(user);
      this._token.next(token);
    }
  }
  login(user: User, token: string) {
    this._user.next(user);
    this._token.next(token);
    this.setAuthenStorage(user, token);
  }
  logout() {
    this._user.next(null);
    this._token.next(null);
    this.setAuthenStorage(null, null);
  }
  getUser(): Observable<User> {
    return this._user;
  }
  setAuthenStorage(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  }
  getAuthenStorage(): {
    user: User | null;
    token: string | null;
  } {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    return {
      user,
      token,
    };
  }
  validateImage(str: string) {
    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);

    // if str
    // is empty return false
    if (str == null) {
      return true;
    }

    // Return true if the str
    // matched the ReGex
    if (regex.test(str) == true) {
      return true;
    } else {
      return false;
    }
  }
}
