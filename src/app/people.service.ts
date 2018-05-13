import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from './people-interface';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { WsError } from './ws-error.abstract';

@Injectable()
export class PeopleService extends WsError {

  configUrl: string;

  constructor(private httpClient: HttpClient) {
    super();
    this.configUrl = `${environment.webserviceHostUrl}`;
   }

  getAllPeople(): Observable<IPerson[]> {
    return this.httpClient.get<IPerson[]>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
}
