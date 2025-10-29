import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterByModelPipe } from '../../pipes/filter-by-model-pipe';
import { PriceCurrencyPipe } from '../../pipes/price-currency-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { CarComponent } from '../car/car';
import { SettingsService } from '../../services/settings/settings';

const cars = [
    { date: new Date().toString(), make: "Toyota", model: "Camry", year: 2020, licensePlate: "ABC-1234", price: 1122981, currency: "euro" },
    { date: new Date().toString(), make: "Honda", model: "Civic", year: 2019, licensePlate: "XYZ-5678", price: 1122981, currency: "dollar" },
    { make: "Ford", model: "Mustang", year: 2021, licensePlate: "JKL-9012", price: 1122981, currency: "dollar" },
    { make: "Chevrolet", model: "Malibu", year: 2018, licensePlate: "MNO-3456", price: 1122981, currency: "dollar" },
    { make: "Nissan", model: "Altima", year: 2022, licensePlate: "QRS-7890", price: 1122981, currency: "dollar" },
    { make: "BMW", model: "3 Series", year: 2020, licensePlate: "TUV-1122", price: 1122981, currency: "dollar" },
    { make: "Audi", model: "A4", year: 2021, licensePlate: "WXY-3344", price: 1122981, currency: "dollar" },
    { make: "Kia", model: "Sorento", year: 2019, licensePlate: "ZAB-5566", price: 1122981, currency: "dollar" },
    { make: "Hyundai", model: "Elantra", year: 2023, licensePlate: "CDE-7788", price: 1122981, currency: "dollar" },
    { make: "Tesla", model: "Model 3", year: 2022, licensePlate: "FGH-9900", price: 1122981, currency: "ils" }
];

export type SingleCar = typeof cars[0]

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, FilterByModelPipe, PriceCurrencyPipe, DiscountPipe, CarComponent],
    selector: 'app-cars-list',
    templateUrl: './cars-list.html',
    styleUrls: ['./cars-list.css']
})
export class CarsListComponent {
    public showList = true;
    public filterText = '';
    public discountNumber = 0;
    public cars = cars;

    constructor(public settingsService: SettingsService) {
    }




    toggleList() {
        this.showList = !this.showList;
    }

    setDiscount(d: number) {
        this.discountNumber = d;
    }

}
