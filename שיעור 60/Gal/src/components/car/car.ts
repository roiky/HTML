import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PriceCurrencyPipe } from '../../pipes/price-currency-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
    imports: [CommonModule, PriceCurrencyPipe, DiscountPipe],
    selector: 'app-car',
    templateUrl: './car.html',
    styleUrls: ['./car.css']
})
export class CarComponent {
    @Input() car: any;
    @Input() d: number = 0;
    @Input() carBgColor: string = "";

    ngOnInit(): void {
        console.log(111) // mount
    }
    ngOnChanges(changes: any): void {
        console.log(changes, "changes") // update 
    }
}   