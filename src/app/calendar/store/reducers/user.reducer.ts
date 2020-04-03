import { User } from '@calendar/model/user';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from '../actions/user.actions';

export interface State extends EntityState<User> {
  // additional entities state properties
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const userReducer = createReducer(
  initialState,
  on(UserActions.getUsersSuccess, (state, action) => adapter.setAll(action.users, state))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
