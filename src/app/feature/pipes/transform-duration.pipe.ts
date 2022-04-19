import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDuration'
})
export class TransformDurationPipe implements PipeTransform {

  transform( value: number ): number {
    switch (value) {
      case 30:
        return 50
      case 45:
        return 75
      case 60:
        return 100
      case 75:
        return 125
      case 90:
        return 150
      case 105:
        return 175
      case 120:
        return 200
      case 135:
        return 225
      case 150:
        return 250
      case 165:
        return 275
      case 180:
        return 300
      default:
        return 25
    }
  }

}
