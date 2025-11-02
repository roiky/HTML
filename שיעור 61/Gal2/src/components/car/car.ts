import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PriceCurrencyPipe } from '../../pipes/price-currency-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { FavoritesService } from '../../services/favorites/favorites';
import { SingleCar } from '../cars-list/cars-list';

@Component({
    imports: [CommonModule, PriceCurrencyPipe, DiscountPipe],
    selector: 'app-car',
    templateUrl: './car.html',
    styleUrls: ['./car.css']
})
export class CarComponent {
    @Input() car: SingleCar | any = {}
    @Input() d: number = 0;
    @Input() carBgColor: string = "";

    constructor(public favoritesCars: FavoritesService) { }

    ngOnInit(): void {
        console.log(111) // mount
    }
    ngOnChanges(changes: any): void {
        console.log(changes, "changes") // update 
    }
    addToFavorites() {
        // validation.
        this.favoritesCars.favorites.push(this.car)
    }
}   