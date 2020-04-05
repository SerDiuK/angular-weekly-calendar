import { updateSelectedDate } from '@calendar/store/actions/ui.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Moment } from 'moment';
import * as moment from 'moment';

export interface State {
  selectedDate: Moment;
}

export const initialState: State = {
  selectedDate: moment(),
};

const uiReducer = createReducer(
  initialState,
  on(updateSelectedDate, (state, action) => ({ ...state, selectedDate: action.selectedDate }))
);

export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}
