import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absoluteYPosition'
})
export class AbsoluteYPositionPipe implements PipeTransform {

  transform(index: number): number {
    const baseWidth = 100;
    const baseLeftPadding = 2;
    return (index * baseWidth) + baseLeftPadding;
  }

}
