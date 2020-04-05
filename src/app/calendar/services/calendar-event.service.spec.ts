import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { CalendarEventService } from './calendar-event.service';

export const calendarEventsMock: CalendarEvent[] = [
  { id: 1, title: 'Testing the title', startDate: '2020-04-02 18:00:00', endDate: '2020-04-02 20:00:00', userId: 1 },
  { id: 2, title: 'Testing the time', startDate: '2020-04-03 14:00:00', endDate: '2020-04-03 18:00:00', userId: 1 },
];

describe('CalendarEventService', () => {
  let service: CalendarEventService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalendarEventService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getCalendarEvents()', () => {
    // GIVEN
    spyOn(http, 'get').and.returnValue(of(calendarEventsMock));

    const expected = cold('(a|)', { a: calendarEventsMock });

    // WHEN
    const result = service.getCalendarEvents();

    // THEN
    expect(result).toBeObservable(expected);
  });

  it('should addCalendarEvent()', () => {
    spyOn(http, 'post').and.returnValue(of(calendarEventsMock[0]));

    const expected = cold('(a|)', { a: calendarEventsMock[0] });

    const result = service.addCalendarEvent(calendarEventsMock[0]);

    expect(result).toBeObservable(expected);
  });

  it('should updateCalendarEvent()', () => {
    spyOn(http, 'put').and.returnValue(of(calendarEventsMock[0]));

    const expected = cold('(a|)', { a: calendarEventsMock[0] });

    const result = service.updateCalendarEvent(calendarEventsMock[0]);

    expect(result).toBeObservable(expected);
  });

  it('should deleteCalendarEvents()', () => {
    spyOn(http, 'delete').and.returnValue(of({}));

    const expected = cold('(a|)', { a: {} });

    const result = service.deleteCalendarEvent(2);

    expect(result).toBeObservable(expected);
  });
});
