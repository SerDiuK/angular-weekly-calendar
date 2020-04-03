import { updateChosenDate } from '@calendar/store/actions/ui.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Moment } from 'moment';
import * as moment from 'moment';

export interface State {
  chosenDate: Moment;
}

export const initialState: State = {
  chosenDate: moment(),
};

const uiReducer = createReducer(
  initialState,
  on(updateChosenDate, (state, action) => ({ ...state, chosenDate: action.chosenDate }))
);

export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}
