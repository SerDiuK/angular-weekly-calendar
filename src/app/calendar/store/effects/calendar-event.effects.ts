import { Injectable } from '@angular/core';
import { CalendarEventService } from '@calendar/services/calendar-event.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CalendarEventActions from '@calendar/store/actions/calendar-event.actions';

@Injectable()
export class CalendarEventEffects {
  onGetCalendarEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarEventActions.getCalendarEvents),
      switchMap(() =>
        this.calendarEventService.getCalendarEvents().pipe(
          map((calendarEvents) => CalendarEventActions.getCalendarEventsSuccess({ calendarEvents })),
          catchError((error) => of(CalendarEventActions.getCalendarEventsFailed({ error })))
        )
      )
    )
  );

  onAddCalendarEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarEventActions.addCalendarEvent),
      switchMap((action) =>
        this.calendarEventService.addCalendarEvent(action.calendarEvent).pipe(
          map((calendarEvent) => CalendarEventActions.addCalendarEventSuccess({ calendarEvent })),
          catchError((error) => of(CalendarEventActions.addCalendarEventFailed({ error })))
        )
      )
    )
  );

  onUpdateCalendarEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarEventActions.updateCalendarEvent),
      switchMap((action) =>
        this.calendarEventService.updateCalendarEvent(action.calendarEvent).pipe(
          map((calendarEvent) => CalendarEventActions.updateCalendarEventSuccess({ calendarEvent })),
          catchError((error) => of(CalendarEventActions.updateCalendarEventFailed({ error })))
        )
      )
    )
  );

  onDeleteCalendarEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarEventActions.deleteCalendarEvent),
      switchMap((action) =>
        this.calendarEventService.deleteCalendarEvent(action.id).pipe(
          map(() => CalendarEventActions.deleteCalendarEventSuccess({ id: action.id })),
          catchError((error) => of(CalendarEventActions.deleteCalendarEventFailed({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private calendarEventService: CalendarEventService) {}
}
