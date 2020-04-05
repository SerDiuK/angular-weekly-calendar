import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppState } from '@app-state';
import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { usersMock } from '@calendar/services/user.service.spec';
import { selectUsers } from '@calendar/store';
import {
  addCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from '@calendar/store/actions/calendar-event.actions';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import * as moment from 'moment';

import { CalendarEventDialogComponent } from './calendar-event-dialog.component';

describe('CalendarEventDialogComponent', () => {
  let component: CalendarEventDialogComponent;
  let fixture: ComponentFixture<CalendarEventDialogComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarEventDialogComponent],
      imports: [ReactiveFormsModule, CalendarModule, DropdownModule],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectUsers, value: usersMock }],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventDialogComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create when creating a new event', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create when updating an existing event', () => {
    component.calendarEventToUpdate = calendarEventsMock[0];

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should deleteEvent', () => {
    const expected = deleteCalendarEvent({ id: calendarEventsMock[0].id });

    component.calendarEventToUpdate = calendarEventsMock[0];
    component.deleteEvent();

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  describe('saveEvent', () => {
    it('should only dispatch when the form is valid', () => {
      fixture.detectChanges();

      component.form.setValue({
        title: null,
        startDate: moment('2020-04-10 18:00', backendDateTimeFormat).toDate(),
        endDate: moment('2020-04-10 20:00', backendDateTimeFormat).toDate(),
        userId: null,
      });

      component.saveEvent();

      expect(store.dispatch).not.toHaveBeenCalledWith(updateCalendarEvent);
      expect(store.dispatch).not.toHaveBeenCalledWith(addCalendarEvent);
    });

    it('should dispatch updateCalendarEvent when it is updating an existing event', () => {
      component.calendarEventToUpdate = calendarEventsMock[0];
      fixture.detectChanges();

      component.form.setValue({
        title: 'Fun title',
        startDate: moment('2020-04-10 18:00', backendDateTimeFormat).toDate(),
        endDate: moment('2020-04-10 20:00', backendDateTimeFormat).toDate(),
        userId: 1,
      });

      const expected = updateCalendarEvent({
        calendarEvent: {
          title: 'Fun title',
          startDate: '2020-04-10 18:00',
          endDate: '2020-04-10 20:00',
          userId: 1,
          id: 1,
        },
      });

      component.saveEvent();

      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });

    it('should dispatch addCalendarEvent when it is adding a new event', () => {
      fixture.detectChanges();
      component.form.setValue({
        title: 'Fun title',
        startDate: moment('2020-04-10 18:00', backendDateTimeFormat).toDate(),
        endDate: moment('2020-04-10 20:00', backendDateTimeFormat).toDate(),
        userId: 1,
      });

      const expected = addCalendarEvent({
        calendarEvent: {
          title: 'Fun title',
          startDate: '2020-04-10 18:00',
          endDate: '2020-04-10 20:00',
          userId: 1,
          id: null,
        },
      });

      component.saveEvent();

      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
