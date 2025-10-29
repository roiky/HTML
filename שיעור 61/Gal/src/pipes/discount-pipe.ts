import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'discount'
})
export class DiscountPipe implements PipeTransform {

    transform(currentPrice: number, discount: number): number {
        const newPrice = currentPrice - currentPrice * (discount / 100)
        return Math.ceil(newPrice)
    }

}
