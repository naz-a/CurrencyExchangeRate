import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatetimeStringPipe } from './datetime-string.pipe';

@NgModule({
  imports: [CommonModule],

  declarations: [DatetimeStringPipe],

  exports: [DatetimeStringPipe],
})
export class DatetimeStringPipeModule {}
