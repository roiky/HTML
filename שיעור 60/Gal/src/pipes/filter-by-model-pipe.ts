import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByModel'
})
export class FilterByModelPipe implements PipeTransform {
  transform(cars: any[], filterText: string): any[] {
    if (!filterText) return cars;
    filterText = filterText.toLowerCase();
    return cars.filter(car => car.model.toLowerCase().includes(filterText));
  }
}
