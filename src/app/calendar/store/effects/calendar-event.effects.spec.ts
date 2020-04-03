import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { CalendarEventService } from '@calendar/services/calendar-event.service';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as CalendarEventActions from '@calendar/store/actions/calendar-event.actions';
import { CalendarEventEffects } from './calendar-event.effects';

describe('CalendarEventEffects', () => {
  let actions$: Observable<any>;
  let effects: CalendarEventEffects;
  let service: CalendarEventService;

  const serviceStub: Partial<CalendarEventService> = {
    getCalendarEvents(): Observable<CalendarEvent[]> {
      return of(calendarEventsMock);
    },
    addCalendarEvent(): Observable<CalendarEvent> {
      return of(calendarEventsMock[0]);
    },
    updateCalendarEvent(): Observable<CalendarEvent> {
      return of(calendarEventsMock[0]);
    },
    deleteCalendarEvent(): Observable<{}> {
      return of({});
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarEventEffects,
        provideMockActions(() => actions$),
        { provide: CalendarEventService, useValue: serviceStub },
      ],
    });

    effects = TestBed.inject<CalendarEventEffects>(CalendarEventEffects);
    service = TestBed.inject(CalendarEventService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return getCalendarEventSuccess when loading a calendarEvent is successful', () => {
    spyOn(service, 'getCalendarEvents').and.callThrough();

    actions$ = hot('-a-', { a: CalendarEventActions.getCalendarEvents() });
    const expected = cold('-b-', {
      b: CalendarEventActions.getCalendarEventsSuccess({ calendarEvents: calendarEventsMock }),
    });

    expect(effects.onGetCalendarEvents$).toBeObservable(expected);
  });

  it('should return getCalendarEventFailed when loading a calendarEvent is unsuccessful', () => {
    spyOn(service, 'getCalendarEvents').and.returnValue(throwError(new Error('error')));

    actions$ = hot('-a-', { a: CalendarEventActions.getCalendarEvents() });
    const expected = cold('-b-', {
      b: CalendarEventActions.getCalendarEventsFailed({ error: new Error('error') as HttpErrorResponse }),
    });

    expect(effects.onGetCalendarEvents$).toBeObservable(expected);
  });

  it('should return addCalendarEventSuccess when creating a calendarEvent is successful', () => {
    spyOn(service, 'addCalendarEvent').and.callThrough();

    actions$ = hot('-a-', {
      a: CalendarEventActions.addCalendarEvent({ calendarEvent: calendarEventsMock[0] }),
    });
    const expected = cold('-b-', {
      b: CalendarEventActions.addCalendarEventSuccess({ calendarEvent: calendarEventsMock[0] }),
    });

    expect(effects.onAddCalendarEvent$).toBeObservable(expected);
  });

  it('should return addCalendarEventFailed when creating a calendarEvent is unsuccessful', () => {
    spyOn(service, 'addCalendarEvent').and.returnValue(throwError(new Error('error')));

    actions$ = hot('-a-', {
      a: CalendarEventActions.addCalendarEvent({ calendarEvent: calendarEventsMock[0] }),
    });
    const expected = cold('-b-', {
      b: CalendarEventActions.addCalendarEventFailed({ error: new Error('error') as HttpErrorResponse }),
    });

    expect(effects.onAddCalendarEvent$).toBeObservable(expected);
  });

  it('should return updateCalendarEventSuccess when updating a calendarEvent is successful', () => {
    spyOn(service, 'updateCalendarEvent').and.callThrough();

    actions$ = hot('-a-', {
      a: CalendarEventActions.updateCalendarEvent({ calendarEvent: calendarEventsMock[0] }),
    });
    const expected = cold('-b-', {
      b: CalendarEventActions.updateCalendarEventSuccess({ calendarEvent: calendarEventsMock[0] }),
    });

    expect(effects.onUpdateCalendarEvent$).toBeObservable(expected);
  });

  it('should return addCalendarEventFailed when creating a calendarEvent is unsuccessful', () => {
    spyOn(service, 'addCalendarEvent').and.returnValue(throwError(new Error('error')));

    actions$ = hot('-a-', {
      a: CalendarEventActions.addCalendarEvent({ calendarEvent: calendarEventsMock[0] }),
    });
    const expected = cold('-b-', {
      b: CalendarEventActions.addCalendarEventFailed({ error: new Error('error') as HttpErrorResponse }),
    });

    expect(effects.onAddCalendarEvent$).toBeObservable(expected);
  });

  it('should return deleteCalendarEventSuccess when deleting a calendarEvent is successful', () => {
    spyOn(service, 'deleteCalendarEvent').and.callThrough();

    actions$ = hot('-a-', { a: CalendarEventActions.deleteCalendarEvent({ id: 1 }) });
    const expected = cold('-b-', { b: CalendarEventActions.deleteCalendarEventSuccess({ id: 1 }) });

    expect(effects.onDeleteCalendarEvent$).toBeObservable(expected);
  });

  it('should return deleteCalendarEventFailed when deleting a calendarEvent is unsuccessful', () => {
    spyOn(service, 'deleteCalendarEvent').and.returnValue(throwError(new Error('error')));

    actions$ = hot('-a-', { a: CalendarEventActions.deleteCalendarEvent({ id: 1 }) });
    const expected = cold('-b-', {
      b: CalendarEventActions.deleteCalendarEventFailed({ error: new Error('error') as HttpErrorResponse }),
    });

    expect(effects.onDeleteCalendarEvent$).toBeObservable(expected);
  });
});
