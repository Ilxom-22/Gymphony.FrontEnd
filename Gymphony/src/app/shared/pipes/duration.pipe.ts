import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 60) {
      return `${value} minute${value !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(value/60);
      const minutes = value % 60;
      const hourText = `${hours} hour${hours !== 1 ? 's' : ''}`;
      const minuteText = minutes > 0 ? ` ${minutes} minute${value !== 1 ? 's' : ''}` : '';
      return hourText + minuteText;
    }
  }

}
