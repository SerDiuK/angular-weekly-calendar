import { updateSelectedDate } from '@calendar/store/actions/ui.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  selectedDate: Date;
}

export const initialState: State = {
  selectedDate: new Date(),
};

const uiReducer = createReducer(
  initialState,
  on(updateSelectedDate, (state, action) => ({ ...state, selectedDate: action.selectedDate }))
);

export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}
