import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppStateFeatures } from '@app-state';
import { reducers as calendarReducers } from '@calendar/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarAddEventDialogComponent } from './components/calendar-add-event-dialog/calendar-add-event-dialog.component';
import { CalendarEventEffects } from './store/effects/calendar-event.effects';
import { CalculateDatePipe } from './pipes/calculate-date.pipe';
import { UserEffects } from './store/effects/user.effects';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';

@NgModule({
  declarations: [CalendarComponent, CalendarAddEventDialogComponent, CalculateDatePipe, CalendarHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(AppStateFeatures.Calendar, calendarReducers),
    EffectsModule.forFeature([CalendarEventEffects, UserEffects]),
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
})
export class CalendarModule {}
