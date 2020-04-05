import { CalendarEvent } from '@calendar/model/calendar-event';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { reducer, initialState, State } from './calendar-event.reducer';
import * as Actions from '../actions/calendar-event.actions';

describe('CalendarEvent Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('addCalendarEventSuccess', () => {
    it('should add a new event to the state', () => {
      const state: State = {
        ids: [1],
        entities: {
          1: calendarEventsMock[0],
        },
      };

      const calendarEvent: CalendarEvent = {
        id: 3,
        title: 'New event',
        startDate: null,
        endDate: null,
        userId: 2,
      };

      const action = Actions.addCalendarEventSuccess({ calendarEvent });
      const expected: State = {
        ids: [1, 3],
        entities: {
          1: calendarEventsMock[0],
          3: calendarEvent,
        },
      };

      const result = reducer(state, action);

      expect(result).toEqual(expected);
    });
  });

  describe('updateCalendarEventSuccess', () => {
    it('should update an existing event in the state', () => {
      const state: State = {
        ids: [1],
        entities: {
          1: { id: 1, title: 'New event', startDate: null, endDate: null, userId: 2 },
        },
      };

      const calendarEvent: CalendarEvent = {
        id: 1,
        title: 'Newer event',
        startDate: '2020-12-2',
        endDate: null,
        userId: 1,
      };

      const action = Actions.updateCalendarEventSuccess({ calendarEvent });
      const expected: State = {
        ids: [1],
        entities: {
          1: calendarEvent,
        },
      };

      const result = reducer(state, action);

      expect(result).toEqual(expected);
    });
  });

  describe('deleteCalendarEventSuccess', () => {
    it('should delete an existing event in the state', () => {
      const state: State = {
        ids: [1],
        entities: {
          1: { id: 1, title: 'New event', startDate: null, endDate: null, userId: 2 },
        },
      };

      const action = Actions.deleteCalendarEventSuccess({ id: 1 });
      const result = reducer(state, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('getCalendarEventsSuccess', () => {
    it('should add events to the state', () => {
      const action = Actions.getCalendarEventsSuccess({ calendarEvents: calendarEventsMock });
      const expected: State = {
        ids: calendarEventsMock.map((event) => event.id),
        entities: calendarEventsMock.reduce((acc, cur) => Object.assign({}, acc, { [cur.id]: cur }), {}),
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });
  });
});
