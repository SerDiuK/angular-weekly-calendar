import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppState } from '@app-state';
import { usersMock } from '@calendar/services/user.service.spec';
import { updateSelectedDate } from '@calendar/store/actions/ui.actions';
import { updateSelectedUser } from '@calendar/store/actions/user.actions';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { selectSelectedDate, selectSelectedUser, selectUsers } from '@calendar/store';
import { provideMockStore } from '@ngrx/store/testing';

import { CalendarHeaderComponent } from './calendar-header.component';

describe('CalendarHeaderComponent', () => {
  let component: CalendarHeaderComponent;
  let fixture: ComponentFixture<CalendarHeaderComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarHeaderComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSelectedDate, value: moment() },
            { selector: selectSelectedUser, value: usersMock[0] },
            { selector: selectUsers, value: usersMock },
          ],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateSelectedDate on update', () => {
    spyOn(store, 'dispatch');
    const mockDate = moment('2020-04-02', 'YYYY-MM-DD').toDate();
    const expected = updateSelectedDate({ selectedDate: mockDate });

    component.updateSelectedDate(mockDate);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch updateSelectedUser on update', () => {
    spyOn(store, 'dispatch');
    const mockUser = usersMock[0];
    const expected = updateSelectedUser({ selectedUser: mockUser });

    component.updateSelectedUser(mockUser);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });
});
