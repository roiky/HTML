import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { country } from './countriesDummy';
import { Observable } from 'rxjs';
import axios from 'axios';

export type Country = (typeof country)[0];
export type Countries = Country[];

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl = `https://restcountries.com/v3.1/all?fields=name,flags`;
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Countries> {
    return this.http.get<Countries>(this.apiUrl);
  }

  async getCountriesPromise(): Promise<Countries> {
    const result = await axios.get<Countries>(this.apiUrl);
    return result.data;
  }
}
