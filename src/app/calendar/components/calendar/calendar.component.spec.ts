import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculateDatePipe } from '@calendar/pipes/calculate-date.pipe';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { selectCalendarEvents, selectChosenDate } from '@calendar/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, CalculateDatePipe],
      imports: [],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectChosenDate, value: moment() },
            { selector: selectCalendarEvents, value: calendarEventsMock },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
