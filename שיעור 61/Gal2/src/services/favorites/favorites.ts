import { Injectable } from '@angular/core';
import type { SingleCar } from '../../components/cars-list/cars-list';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    public favorites: Array<SingleCar> = []

}
