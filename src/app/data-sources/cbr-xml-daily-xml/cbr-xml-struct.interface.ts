import { CbrXmlValute } from './cbr-xml-valute.interface';

export interface CbrXmlStruct {
  ValCurs: {
    $: { Date: string; name: string };
    Valute: CbrXmlValute[];
  };
}
