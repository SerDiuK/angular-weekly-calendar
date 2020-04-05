import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@app-state';
import { User } from '@calendar/model/user';
import { selectSelectedDate, selectSelectedUser, selectUsers } from '@calendar/store';
import { updateSelectedDate } from '@calendar/store/actions/ui.actions';
import { getUsers, updateSelectedUser } from '@calendar/store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent implements OnInit {
  selectedDate$: Observable<Moment> = this.store.select(selectSelectedDate);
  selectedUserId$: Observable<User> = this.store.select(selectSelectedUser);
  users$: Observable<User[]> = this.store.select(selectUsers);

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
  }

  updateSelectedDate(selectedDate: Moment): void {
    this.store.dispatch(updateSelectedDate({ selectedDate: moment(selectedDate) }));
  }

  updateSelectedUser(selectedUser: User): void {
    this.store.dispatch(updateSelectedUser({ selectedUser }));
  }
}
