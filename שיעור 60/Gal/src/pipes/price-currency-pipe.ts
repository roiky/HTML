import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceCurrency'
})
export class PriceCurrencyPipe implements PipeTransform {

    transform(value: number, currencyStr: string): string {
        const prettyPrice = value.toLocaleString()
        if (currencyStr === "dollar") {
            return `${prettyPrice} $`
        } else if (currencyStr === "euro") {
            return `${prettyPrice} €`
        } else {
            return `${prettyPrice} ₪`
        }
    }

}
