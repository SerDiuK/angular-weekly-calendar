import { HttpErrorResponse } from '@angular/common/http';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { createAction, props } from '@ngrx/store';

export const getCalendarEvents = createAction('[CalendarEvent/API] Load CalendarEvents');

export const getCalendarEventsSuccess = createAction(
  '[CalendarEvent/API] Load CalendarEvents SUCCESS',
  props<{ calendarEvents: CalendarEvent[] }>()
);

export const getCalendarEventsFailed = createAction(
  '[CalendarEvent/API] Load CalendarEvents FAILED',
  props<{ error: HttpErrorResponse }>()
);

export const addCalendarEvent = createAction(
  '[CalendarEvent/API] Add CalendarEvent',
  props<{ calendarEvent: CalendarEvent }>()
);

export const addCalendarEventSuccess = createAction(
  '[CalendarEvent/API] Add CalendarEvent SUCCESS',
  props<{ calendarEvent: CalendarEvent }>()
);

export const addCalendarEventFailed = createAction(
  '[CalendarEvent/API] Add CalendarEvent FAILED',
  props<{ error: HttpErrorResponse }>()
);

export const updateCalendarEvent = createAction(
  '[CalendarEvent/API] Update CalendarEvent',
  props<{ calendarEvent: CalendarEvent }>()
);

export const updateCalendarEventSuccess = createAction(
  '[CalendarEvent/API] Update CalendarEvent SUCCESS',
  props<{ calendarEvent: CalendarEvent }>()
);

export const updateCalendarEventFailed = createAction(
  '[CalendarEvent/API] Update CalendarEvent FAILED',
  props<{ error: HttpErrorResponse }>()
);

export const deleteCalendarEvent = createAction('[CalendarEvent/API] Delete CalendarEvent', props<{ id: number }>());

export const deleteCalendarEventSuccess = createAction(
  '[CalendarEvent/API] Delete CalendarEvent SUCCESS',
  props<{ id: number }>()
);
export const deleteCalendarEventFailed = createAction(
  '[CalendarEvent/API] Delete CalendarEvent FAILED',
  props<{ error: HttpErrorResponse }>()
);
