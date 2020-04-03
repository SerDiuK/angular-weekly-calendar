import { AppStateFeatures } from '@app-state';
import * as fromCalendarEvents from '@calendar/store/reducers/calendar-event.reducer';
import * as fromUsers from '@calendar/store/reducers/user.reducer';
import * as fromUi from '@calendar/store/reducers/calendar-ui.reducer';
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

/* Calendar Ui */

export const selectChosenDate = createSelector(selectCalendarState, (state) => state.calendarUi.chosenDate);
