import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { selectCalendarEvents, selectSelectedDate } from '@calendar/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSelectedDate, value: moment('2020-04-02 18:00', backendDateTimeFormat) },
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

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
