import { CalendarEvent } from '@calendar/model/calendar-event';

export interface WeekdayWithEvents {
  date: Date;
  events: CalendarEvent[];
}
