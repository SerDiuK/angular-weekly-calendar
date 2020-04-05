import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { selectCalendarEvents, selectSelectedDate } from '@calendar/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';
import { DialogModule } from 'primeng/dialog';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [DialogModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSelectedDate, value: moment('2020-04-02 18:00', backendDateTimeFormat) },
            { selector: selectCalendarEvents, value: calendarEventsMock },
          ],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should open the new event dialog on openNewEvent', () => {
    const newEventDate = moment('2020-04-02 18:22', backendDateTimeFormat).toDate();

    component.openNewEvent(newEventDate, 12);

    expect(component.showNewEventDialog).toBeTrue();
    expect(component.newEventDate).toEqual(moment('2020-04-02 12:00', backendDateTimeFormat).toDate());

    const dialog = fixture.nativeElement.querySelector('.new-event-dialog');

    expect(dialog).toBeTruthy();
  });

  it('should open the update dialog on updateEvent', () => {
    component.openUpdateEvent(calendarEventsMock[0]);

    expect(component.showUpdateEventDialog).toBeTrue();
    expect(component.calendarEventToUpdate).toEqual(calendarEventsMock[0]);

    const dialog = fixture.nativeElement.querySelector('.update-event-dialog');

    expect(dialog).toBeTruthy();
  });

  it('should calculate the event position', () => {
    const expected = { height: '8.3391%', top: '75.0521%' };

    const result = component.calculateEventPosition(calendarEventsMock[0]);

    expect(result).toEqual(expected);
  });
});
