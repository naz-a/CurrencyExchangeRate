import * as moment from 'moment';
import { ExchangeRate } from 'src/app/classes/exchange-rate';
import * as xml2js from 'xml2js';

import { DataSource } from '../common/data-source.interface';
import { ResponseType } from '../common/response-type.enum';
import { CbrXmlStruct } from './cbr-xml-struct.interface';
import { CbrXmlValute } from './cbr-xml-valute.interface';

export class CbrXmlDataSource implements DataSource {
  readonly url: string = 'https://www.cbr-xml-daily.ru/daily_utf8.xml';
  readonly responseType = ResponseType.text;

  protected _parser(data: string): CbrXmlStruct {
    const parser = new xml2js.Parser();
    let out;
    parser.parseString(data, (err, result) => {
      out = result;
    });
    return out;
  }
  buildExchangeRate(data: string) {
    const dataObj = this._parser(data);
    const currEur: CbrXmlValute = dataObj.ValCurs.Valute.filter((curr) =>
      curr.CharCode.includes('EUR')
    )[0];
    return new ExchangeRate(
      this.url,
      moment(dataObj.ValCurs.$.Date, 'DD.MM.YYYY'),
      currEur.CharCode[0],
      currEur.Name[0],
      +currEur.Nominal[0],
      +currEur.Value[0].replace(',', '.')
    );
  }
}
