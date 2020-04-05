import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStateFeatures } from '@app-state';
import { reducers as calendarReducers } from '@calendar/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarEventDialogComponent } from './components/calendar-event-dialog/calendar-event-dialog.component';
import { CalendarEventEffects } from './store/effects/calendar-event.effects';
import { UserEffects } from './store/effects/user.effects';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [CalendarComponent, CalendarEventDialogComponent, CalendarHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(AppStateFeatures.Calendar, calendarReducers),
    EffectsModule.forFeature([CalendarEventEffects, UserEffects]),
    PrimeNgCalendarModule,
    DropdownModule,
    DialogModule,
  ],
  providers: [],
})
export class CalendarModule {}
