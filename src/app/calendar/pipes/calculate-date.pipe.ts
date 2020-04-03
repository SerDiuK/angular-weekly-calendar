import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'calculateDate',
})
export class CalculateDatePipe implements PipeTransform {
  transform(chosenDay: Moment, weekdayIndex: number): unknown {
    const chosenDateDayInWeek = chosenDay.weekday();
    const differenceIndexChosenDate = weekdayIndex - chosenDateDayInWeek;

    if (differenceIndexChosenDate > 0) {
      return chosenDay.add(differenceIndexChosenDate, 'days').date();
    } else if (differenceIndexChosenDate < 0) {
      return chosenDay.subtract(-differenceIndexChosenDate, 'days').date();
    } else {
      return chosenDay.date();
    }
  }
}
