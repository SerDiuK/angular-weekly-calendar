import { AppStateFeatures } from '@app-state';
import * as fromCalendarEvents from '@calendar/store/reducers/calendar-event.reducer';
import * as fromUsers from '@calendar/store/reducers/user.reducer';
import * as fromUi from '@calendar/store/reducers/calendar-ui.reducer';
import { CalendarUtils } from '@calendar/utils/calendar.utils';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  calendarEvents: fromCalendarEvents.State;
  users: fromUsers.State;
  calendarUi: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  calendarEvents: fromCalendarEvents.reducer,
  users: fromUsers.reducer,
  calendarUi: fromUi.reducer,
};

const selectCalendarState = createFeatureSelector<State>(AppStateFeatures.Calendar);

/* Calendar Events */

export const selectCalendarEvents = createSelector(selectCalendarState, (state) =>
  fromCalendarEvents.selectAll(state.calendarEvents)
);

/* Users */

export const selectUsers = createSelector(selectCalendarState, (state) => fromUsers.selectAll(state.users));

export const selectSelectedUser = createSelector(selectCalendarState, (state) => state.users.selectedUser);

/* Calendar Ui */

export const selectSelectedDate = createSelector(selectCalendarState, (state) => state.calendarUi.selectedDate);

export const selectWeekdays = createSelector(selectSelectedDate, CalendarUtils.mapWeekdays);

export const selectWeekdaysWithEvents = createSelector(
  selectWeekdays,
  selectCalendarEvents,
  selectSelectedUser,
  CalendarUtils.groupsWeekdaysAndEvents
);
