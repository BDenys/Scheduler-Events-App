import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absoluteXPosition'
})
export class AbsoluteXPositionPipe implements PipeTransform {

  transform(index: number): number {
    const baseWidth = 150;
    // const timeLineWidth = 125;
    const baseLeftPadding = 2;
    return ( index * baseWidth )+ baseLeftPadding;
  }

}
