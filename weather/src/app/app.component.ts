import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherAppForm: FormGroup;
  country: string;
  city: string;
  weatherDescription = null;
  error = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherAppForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      apikey: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.setValues();

    this.weatherService
      .fetchWeatherDetail(this.weatherAppForm.value)
      .subscribe({
        next: (response) => {
          this.weatherDescription = response;
        },
        error: (error) => {
          console.log(error);
          if (error.error && error.error.Message) {
            this.error = error.error.Message;
          } else {
            this.error =
              'Please enter a valid Api Key. An Api key allows 5 requests per hour. You are either unauthorised or have made too many requests.';
          }
        },
      });
  }

  setValues() {
    this.weatherDescription = null;
    this.error = null;
    this.country = this.weatherAppForm.value.country;
    this.city = this.weatherAppForm.value.city;
  }

  onHandleError() {
    this.error = null;
  }
}
