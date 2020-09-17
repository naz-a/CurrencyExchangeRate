import * as moment from 'moment';
import { ExchangeRate } from 'src/app/classes/exchange-rate';

import { DataSource } from '../common/data-source.interface';
import { ResponseType } from '../common/response-type.enum';
import { CbrJsonStruct } from './cbr-json-struct.interface';
import { CbrJsonValute } from './cbr-json-valute.interface';

export class CbrJsonDataSource implements DataSource {
  readonly url: string = 'https://www.cbr-xml-daily.ru/daily_json.js';
  readonly responseType = ResponseType.json;

  buildExchangeRate(data: CbrJsonStruct) {
    // tslint:disable-next-line: no-string-literal
    const currEur: CbrJsonValute = data.Valute['EUR'];
    return new ExchangeRate(
      this.url,
      moment(data.Timestamp, 'YYYY-MM-DDTHH:mm:ssZZ'), // 2020-09-12T11:30:00+03:00
      currEur.CharCode,
      currEur.Name,
      currEur.Nominal,
      currEur.Value
    );
  }
}
