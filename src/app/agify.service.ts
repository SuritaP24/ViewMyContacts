import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse,HttpParams } from '@angular/common/http';

export interface Agify {
  name : string;
  age: string;
  count : string;
}


@Injectable({
  providedIn: 'root'
})
export class AgifyService {
  public agifyURL = 'https://api.agify.io';
  public queryParams = new HttpParams();

  constructor(private http: HttpClient) { }

  public getAgifyAge(firstname:string): Observable<Agify> {
    this.queryParams = this.queryParams.set("name",firstname);
    return this.http.get<Agify>(this.agifyURL,{ params: this.queryParams});
  }
}
