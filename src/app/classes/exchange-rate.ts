import * as moment from 'moment';

export class ExchangeRate {
  private _lastUpdate = moment();
  constructor(
    private _dataSource?: string,
    private _datetime?: moment.Moment,
    private _currencyCode?: string,
    private _currencyName?: string,
    private _nominal?: number,
    private _exchangeRate?: number
  ) {}

  get dataSource() {
    return this._dataSource;
  }
  get datetime() {
    return this._datetime;
  }
  get currencyCode() {
    return this._currencyCode;
  }
  get currencyName() {
    return this._currencyName;
  }
  get nominal() {
    return this._nominal;
  }
  get exchangeRate() {
    return this._exchangeRate;
  }
  get lastUpdate() {
    return this._lastUpdate;
  }
  [Symbol.toPrimitive](toType) {
    return toType === 'string'
      ? `${this.currencyCode} ${this.currencyName} (${this.nominal} x ): ${this.exchangeRate}`
      : this.exchangeRate;
  }
}
