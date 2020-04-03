import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@app-state';
import { User } from '@calendar/model/user';
import { selectChosenDate, selectUsers } from '@calendar/store';
import { updateChosenDate } from '@calendar/store/actions/ui.actions';
import { getUsers } from '@calendar/store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent implements OnInit {
  chosenDate$: Observable<Moment> = this.store.select(selectChosenDate);
  users$: Observable<User[]> = this.store.select(selectUsers);

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
  }

  updateChosenDate(chosenDate: Moment): void {
    this.store.dispatch(updateChosenDate({ chosenDate }));
  }
}
