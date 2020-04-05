import { CalendarEvent } from '@calendar/model/calendar-event';

export interface WeekdayWithEvents {
  weekday: string;
  date: Date;
  events: CalendarEvent[];
}
