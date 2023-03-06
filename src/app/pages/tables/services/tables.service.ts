import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Customer, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  public loadEmployeeTableData(): Observable<User[]> {
    return of([
      {
        id: 'abc',
        avatar: 'string',
        name: 'nguyen van A',
        email: 'thinh@gmail.com',
        phone: '099999999999',
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sapiente consequatur nihil, illo ab, nemo et quos, temporibus maiores architecto dignissimos id aut voluptates nisi ipsa voluptas quo. Fugiat, quo.',
      },
    ]);
  }

  public loadMaterialTableData(): Observable<Customer[]> {
    return of([
      {
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'send',
      },
      {
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'send',
      },
      {
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'pending',
      },
      {
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'declined',
      },
      {
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: "Let's Dance",
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'send',
      },
    ]);
  }
}
