import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { Weather } from './weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  //This Url should be in an env file in real world
  url = 'https://localhost:5001/api/weather';

  constructor(private httpClient: HttpClient) {}

  fetchWeatherDetail(weatherData: Weather) {
    return this.httpClient
      .get(this.url, {
        headers: new HttpHeaders({ Accept: 'application/json' }),
        params: new HttpParams()
          .set('country', weatherData.country)
          .append('city', weatherData.city)
          .append('apikey', weatherData.apikey),
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(() => errorRes);
        })
      );
  }
}
