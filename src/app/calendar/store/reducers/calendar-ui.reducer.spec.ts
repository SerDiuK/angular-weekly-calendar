import { updateSelectedDate } from '@calendar/store/actions/ui.actions';
import { reducer, initialState, State } from './calendar-ui.reducer';
import * as moment from 'moment';

describe('CalendarUi Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('updateSelectedDate', () => {
    it('should update the selectedDate in the state', () => {
      const selectedDate = moment('2020-04-02', 'YYYY-MM-DD').toDate();
      const action = updateSelectedDate({ selectedDate });
      const expected: State = {
        selectedDate,
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });
  });
});
