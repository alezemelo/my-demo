import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RandomUserResponse } from '../models/randomUser';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RandomUsersService {
  // I dati li prendo da una chiamata http
  constructor(private httpClient: HttpClient) { }

  getData() : Observable<RandomUserResponse> {
    return this.httpClient.get<RandomUserResponse>(environment.urlRandomUser);
  }
}
