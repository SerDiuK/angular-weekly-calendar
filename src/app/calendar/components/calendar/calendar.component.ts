import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app-state';
import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { selectCalendarEvents, selectChosenDate } from '@calendar/store';
import { getCalendarEvents } from '@calendar/store/actions/calendar-event.actions';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarEvents: CalendarEvent[];
  chosenDate$: Observable<Moment> = this.store.select(selectChosenDate);
  weekdays: string[] = moment.weekdaysMin(true);
  hoursInDay: number[] = Array.from(Array(24).keys());
  sub: Subscription;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCalendarEvents());

    this.sub = this.store
      .select(selectCalendarEvents)
      .subscribe((calendarEvents) => (this.calendarEvents = calendarEvents));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createNewEvent(day: string, time: number): void {}

  dateHasEvent(day: string, time: number): CalendarEvent[] {
    return this.calendarEvents.filter((event) => {
      return moment(event.startTime, backendDateTimeFormat);
    });
  }
}
