import { CalendarEvent } from '@calendar/model/calendar-event';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as CalendarEventActions from '@calendar/store/actions/calendar-event.actions';

export interface State extends EntityState<CalendarEvent> {}

export const adapter: EntityAdapter<CalendarEvent> = createEntityAdapter<CalendarEvent>();

export const initialState: State = adapter.getInitialState({});

const calendarEventReducer = createReducer(
  initialState,
  on(CalendarEventActions.addCalendarEventSuccess, (state, action) => adapter.addOne(action.calendarEvent, state)),
  on(CalendarEventActions.deleteCalendarEventSuccess, (state, action) => adapter.removeOne(action.id, state)),
  on(CalendarEventActions.getCalendarEventsSuccess, (state, action) => adapter.setAll(action.calendarEvents, state))
);

export function reducer(state: State | undefined, action: Action) {
  return calendarEventReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
