import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { timer } from 'rxjs/internal/observable/timer';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { ExchangeRate } from './classes/exchange-rate';
import { CbrJsonDataSource } from './data-sources/cbr-xml-daily-json/cbr-json-data-source';
import { CbrXmlDataSource } from './data-sources/cbr-xml-daily-xml/cbr-xml-data-source';
import { DataSource } from './data-sources/common/data-source.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CurrencyExchangeRate';

  readonly requestInitialDelay = 1000;
  readonly requestInterval = 10000;
  dataSourcePool = [new CbrXmlDataSource(), new CbrJsonDataSource()];
  indexDataSource = 0;
  selectedDataSource: DataSource = this.dataSourcePool[this.indexDataSource];

  actualExchangeRate = new BehaviorSubject<ExchangeRate>(null);
  private _unsubscriber = new Subject();

  constructor(private _http: HttpClient) {}
  ngOnInit() {
    timer(this.requestInitialDelay, this.requestInterval)
      .pipe(takeUntil(this._unsubscriber.asObservable()))
      .subscribe(() => {
        this.sendRequest();
      });
  }
  ngOnDestroy() {
    this.stopRequestingData();
  }

  setNextDataSource() {
    console.log('Switching to next data source');
    this.indexDataSource++;
    this.indexDataSource =
      this.indexDataSource < this.dataSourcePool.length
        ? this.indexDataSource
        : 0;
    this.selectedDataSource = this.dataSourcePool[this.indexDataSource];
    return [this.indexDataSource, this.selectedDataSource];
  }

  sendRequest() {
    this._http
      .get(this.selectedDataSource.url, {
        responseType: this.selectedDataSource.responseType,
      })
      .pipe(
        map((data) => this.selectedDataSource.buildExchangeRate(data)),
        catchError((error) => {
          console.log('Error occured on data request');
          this.setNextDataSource();
          return this.actualExchangeRate.asObservable();
        })
      )
      .subscribe((data: ExchangeRate) => {
        this.responseHandler(data);
      });
  }

  responseHandler(data: ExchangeRate) {
    this.actualExchangeRate.next(data);
  }

  stopRequestingData() {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }
}
