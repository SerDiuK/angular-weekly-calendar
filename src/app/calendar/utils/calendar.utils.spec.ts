import { WeekdayWithEvents } from '@calendar/model/weekday-with-events';
import { calendarEventsMock } from '@calendar/services/calendar-event.service.spec';
import { usersMock } from '@calendar/services/user.service.spec';
import { CalendarUtils } from '@calendar/utils/calendar.utils';
import * as moment from 'moment';

describe('CalendarUtils', () => {
  describe('groupsWeekdaysAndEvents', () => {
    const weekdaysMock: WeekdayWithEvents[] = CalendarUtils.mapWeekdays(moment('2020-04-02', 'YYYY-MM-DD').toDate());

    it('should group weekdays and events', () => {
      const expected: WeekdayWithEvents[] = [
        { ...weekdaysMock[0] },
        { ...weekdaysMock[1] },
        { ...weekdaysMock[2] },
        { ...weekdaysMock[3], events: [calendarEventsMock[0]] },
        { ...weekdaysMock[4], events: [calendarEventsMock[1]] },
        { ...weekdaysMock[5] },
        { ...weekdaysMock[6] },
      ];

      const result = CalendarUtils.groupsWeekdaysAndEventsBySelectedUser(
        weekdaysMock,
        calendarEventsMock,
        usersMock[0]
      );

      expect(result).toEqual(expected);
    });
  });

  describe('mapWeekdays', () => {
    it('should group weekdays and events', () => {
      const testDate = moment('2020-04-02', 'YYYY-MM-DD').toDate();

      const expected: WeekdayWithEvents[] = [
        { date: moment('2020-03-30', 'YYYY-MM-DD').toDate(), events: [] },
        { date: moment('2020-03-31', 'YYYY-MM-DD').toDate(), events: [] },
        { date: moment('2020-04-01', 'YYYY-MM-DD').toDate(), events: [] },
        { date: moment('2020-04-02', 'YYYY-MM-DD').toDate(), events: [] },
        { date: moment('2020-04-03', 'YYYY-MM-DD').toDate(), events: [] },
        { date: moment('2020-04-04', 'YYYY-MM-DD').toDate(), events: [] },
        { date: moment('2020-04-05', 'YYYY-MM-DD').toDate(), events: [] },
      ];

      const result = CalendarUtils.mapWeekdays(testDate);

      expect(result).toEqual(expected);
    });
  });
});
