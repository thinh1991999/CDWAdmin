import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';

import { Amenity } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  public getAnenities(): Promise<any> {
    return axios.get('http://localhost:8000/amenity/all');
    // return of([
    //   {
    //     id: '123',
    //     name: 'abc',
    //     icon_url: '',
    //     description: 'hello',
    //   },
    // ]);
  }
}
