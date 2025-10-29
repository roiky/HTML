import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Country } from '../../services/countries/countries-service';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-card.html',
  styleUrls: ['./country-card.css'],
})
export class CountryCard {
  @Input() country!: Country;
}
