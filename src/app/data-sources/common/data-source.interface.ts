import { ExchangeRate } from 'src/app/classes/exchange-rate';

export interface DataSource {
  readonly url: string;
  readonly responseType: any;
  buildExchangeRate: (data: any) => ExchangeRate;
}
