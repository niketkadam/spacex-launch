import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  url = 'https://api.spacexdata.com/v3/launches?limit=100';
  query = {};
  queryState = new BehaviorSubject(this.query);
  constructor(private http: HttpClient) { }

  getDetails(params?) {
    console.log(params);
    if (Object.keys(params).length !== 0) {
      return this.http.get(`${this.url}&launch_success=${params.lauch_success}
      &land_success=${params.land_success}&launch_year=${params.launch_year}`);
    } else {
      return this.http.get(`${this.url}`, params);
    }

  }

  updateQueryParams(queryParam) {
    this.query = queryParam;
    this.queryState.next(this.query);
  }

  //Getters
  get queryState$() {
    return this.queryState.asObservable();
  }
}
