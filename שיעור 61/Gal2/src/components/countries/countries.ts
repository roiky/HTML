import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country, CountriesService } from '../../services/countries/countries-service';
import { CountryCard } from '../country-card/country-card';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule, CountryCard],
  templateUrl: './countries.html',
  styleUrls: ['./countries.css'],
})
export class Countries {
  public listOfCountries: Country[] = [];
  public errorMessage: string = '';
  public isLoading: boolean = true;
  public showMessage: string = 'country check';

  constructor(public CountriesService: CountriesService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.CountriesService.getCountriesPromise()
      .then((d: Country[]) => {
        this.listOfCountries = d;
        console.log('list of countries:', this.listOfCountries);
      })
      .catch((err) => {
        console.error(err);
        this.errorMessage = 'Something went wrong';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  addString() {
    this.showMessage += '!';
  }
}
