import { usersMock } from '@calendar/services/user.service.spec';
import { reducer, initialState, State } from './user.reducer';
import * as Actions from '../actions/user.actions';

describe('User Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('getUsersSuccess', () => {
    it('should add users to the state', () => {
      const action = Actions.getUsersSuccess({ users: usersMock });
      const expected: State = {
        ids: usersMock.map((user) => user.id),
        entities: usersMock.reduce((acc, cur) => Object.assign({}, acc, { [cur.id]: cur }), {}),
        selectedUser: null,
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });
  });

  describe('updateSelectedUser', () => {
    it('should update the selected user', () => {
      const action = Actions.updateSelectedUser({ selectedUser: usersMock[0] });
      const expected: State = {
        ...initialState,
        selectedUser: usersMock[0],
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });
  });
});
