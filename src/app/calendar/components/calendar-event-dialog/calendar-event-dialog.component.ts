import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@app-state';
import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { User } from '@calendar/model/user';
import { selectUsers } from '@calendar/store';
import {
  addCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from '@calendar/store/actions/calendar-event.actions';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface SelectItem {
  value: number;
  label: string;
}

@Component({
  selector: 'app-calendar-event-dialog',
  templateUrl: './calendar-event-dialog.component.html',
  styleUrls: ['./calendar-event-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventDialogComponent implements OnInit {
  @Input() newEventDate: Date;
  @Input() calendarEventToUpdate: CalendarEvent;
  @Output() dialogClose: EventEmitter<void> = new EventEmitter();

  form: FormGroup;
  users$: Observable<SelectItem[]> = this.store.select(selectUsers).pipe(map(this.mapUserToSelectItem));
  submitted: boolean;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForm();
  }

  saveEvent(): void {
    this.submitted = true;

    if (this.form.valid) {
      const calendarEvent: CalendarEvent = {
        id: this.calendarEventToUpdate ? this.calendarEventToUpdate.id : null,
        startDate: moment(this.form.value.startDate).format(backendDateTimeFormat),
        endDate: moment(this.form.value.endDate).format(backendDateTimeFormat),
        title: this.form.value.title,
        userId: this.form.value.user.id,
      };

      if (this.calendarEventToUpdate) {
        this.store.dispatch(updateCalendarEvent({ calendarEvent }));
      } else {
        this.store.dispatch(addCalendarEvent({ calendarEvent }));
      }

      this.closeDialog();
    }
  }

  deleteEvent(): void {
    this.store.dispatch(deleteCalendarEvent({ id: this.calendarEventToUpdate.id }));
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogClose.emit();
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.calendarEventToUpdate?.title, Validators.required),
      startDate: new FormControl(this.getStartDateDefaultValue.call(this), Validators.required),
      endDate: new FormControl(this.getEndDateDefaultValue.call(this), Validators.required),
      user: new FormControl(this.calendarEventToUpdate?.userId, Validators.required),
    });
  }

  private getStartDateDefaultValue(): Date {
    return this.calendarEventToUpdate
      ? moment(this.calendarEventToUpdate.startDate, backendDateTimeFormat).toDate()
      : this.newEventDate;
  }

  private getEndDateDefaultValue(): Date {
    return this.calendarEventToUpdate
      ? moment(this.calendarEventToUpdate?.endDate, backendDateTimeFormat).toDate()
      : moment(this.newEventDate).add(1, 'h').toDate();
  }

  private mapUserToSelectItem(users: User[]): SelectItem[] {
    return users.map((user) => ({ value: user.id, label: user.name }));
  }
}
