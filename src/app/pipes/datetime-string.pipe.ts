import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dtString',
})
export class DatetimeStringPipe implements PipeTransform {
  transform(value: moment.Moment): string {
    // tslint:disable-next-line:max-line-length
    return (!!value && value.format('DD.MM.YYYY HH:mm:ss')) || '';
  }
}
