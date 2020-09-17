import { CbrJsonValute } from './cbr-json-valute.interface';

export interface CbrJsonStruct {
  Date: string;
  Timestamp: string;
  Valute: CbrJsonValute[];
}
