import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '@app-state';
import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { WeekdayWithEvents } from '@calendar/model/weekday-with-events';
import { selectWeekdaysWithEvents } from '@calendar/store';
import { getCalendarEvents } from '@calendar/store/actions/calendar-event.actions';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  weekdays$: Observable<WeekdayWithEvents[]> = this.store.select(selectWeekdaysWithEvents);
  hoursInDay: number[] = Array.from(Array(24).keys());
  showNewEventDialog: boolean;
  showUpdateEventDialog: boolean;
  newEventDate: Date;
  calendarEventToUpdate: CalendarEvent;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCalendarEvents());
  }

  calculateEventPosition(calendarEvent: CalendarEvent): { top: string; height: string } {
    const startOfDayUnix = moment(calendarEvent.startDate, backendDateTimeFormat).set('h', 0).set('m', 0).unix();
    const endOfDayUnix = moment(calendarEvent.startDate, backendDateTimeFormat).set('h', 23).set('m', 59).unix();
    const differenceDay = endOfDayUnix - startOfDayUnix;

    const startOfEventUnix = Math.max(moment(calendarEvent.startDate, backendDateTimeFormat).unix(), startOfDayUnix);
    const endOfEventUnix = Math.min(moment(calendarEvent.endDate, backendDateTimeFormat).unix(), endOfDayUnix);

    const differenceStartOfEvent = startOfEventUnix - startOfDayUnix;
    const differenceEndOfEvent = endOfEventUnix - startOfDayUnix;

    const top = (differenceStartOfEvent / differenceDay) * 100;
    const height = ((differenceEndOfEvent - differenceStartOfEvent) / differenceDay) * 100;

    return {
      height: height.toFixed(4) + '%',
      top: top.toFixed(4) + '%',
    };
  }

  openNewEvent(newEventDate: Date, hour: number) {
    this.newEventDate = moment(newEventDate).set('hour', hour).set('minute', 0).toDate();
    this.showNewEventDialog = true;
  }

  openUpdateEvent(event: CalendarEvent) {
    this.calendarEventToUpdate = event;
    this.showUpdateEventDialog = true;
  }
}
