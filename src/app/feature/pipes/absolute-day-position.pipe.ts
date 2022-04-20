import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absoluteDayPosition'
})
export class AbsoluteDayPositionPipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case 0:
      case 6:
      case 12:
      case 18:
        return 0;
        break;
      case 1:
      case 5:
      case 7:
      case 11:
      case 13:
      case 17:
        return 250;
        break;
      case 2:
      case 4:
      case 8:
      case 10:
      case 14:
      case 16:
        return 500;
        break;
      case 3:
      case 9:
      case 15:
        return 750;
        break;
    }
  }

}
