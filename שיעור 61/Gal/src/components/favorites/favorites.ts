import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites/favorites';
import { CarComponent } from '../car/car';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-favorites',
    imports: [CarComponent, CommonModule],
    templateUrl: './favorites.html',
    styleUrl: './favorites.css'
})
export class Favorites {
    constructor(public favoritesCars: FavoritesService) { }

    clearFavorites() {
        this.favoritesCars.favorites = [];
    }
}
