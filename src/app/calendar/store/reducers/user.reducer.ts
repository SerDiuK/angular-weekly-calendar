import { User } from '@calendar/model/user';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from '../actions/user.actions';

export interface State extends EntityState<User> {
  selectedUser: User;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  selectedUser: null,
});

const userReducer = createReducer(
  initialState,
  on(UserActions.getUsersSuccess, (state, action) => adapter.setAll(action.users, state)),
  on(UserActions.updateSelectedUser, (state, action) => ({ ...state, selectedUser: action.selectedUser }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
