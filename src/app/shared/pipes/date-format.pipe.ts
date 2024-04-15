import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'MMMM d, yyyy'): any {
    if (!value || !value.toDate) return '';

    const date = value.toDate();
    return formatDate(date, format, 'en-US');
  }
}
