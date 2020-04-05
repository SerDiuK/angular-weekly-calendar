import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { usersMock } from '@calendar/services/user.service.spec';
import * as moment from 'moment';
import { selectSelectedDate, selectSelectedUser, selectUsers } from '@calendar/store';
import { provideMockStore } from '@ngrx/store/testing';

import { CalendarHeaderComponent } from './calendar-header.component';

describe('CalendarHeaderComponent', () => {
  let component: CalendarHeaderComponent;
  let fixture: ComponentFixture<CalendarHeaderComponent>;

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
    }).compileComponents();
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
});
