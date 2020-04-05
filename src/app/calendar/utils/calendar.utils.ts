import { backendDateTimeFormat } from '@calendar/config/calendar.config';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { User } from '@calendar/model/user';
import { WeekdayWithEvents } from '@calendar/model/weekday-with-events';
import * as moment from 'moment';

export class CalendarUtils {
  static groupsWeekdaysAndEventsBySelectedUser(
    weekdays: WeekdayWithEvents[],
    calendarEvents: CalendarEvent[],
    selectedUser: User
  ): WeekdayWithEvents[] {
    return weekdays.map((weekday) => {
      weekday.events = calendarEvents.filter((event) => {
        const formattedStartDate = moment(event.startDate, backendDateTimeFormat).format('YYYY-MM-DD');

        return (
          formattedStartDate === moment(weekday.date).format('YYYY-MM-DD') &&
          (!selectedUser || event.userId === selectedUser.id)
        );
      });

      return weekday;
    });
  }

  static mapWeekdays(selectedDate: Date): WeekdayWithEvents[] {
    return moment.weekdaysMin().map((weekday, weekdayIndex) => {
      const mappedDate = moment(selectedDate);
      const selectedDateDayInWeek = moment(selectedDate).weekday() - 1; // Sets it to Monday instead of Sunday
      const differenceIndexSelectedDate = weekdayIndex - selectedDateDayInWeek;

      if (differenceIndexSelectedDate > 0) {
        mappedDate.add(differenceIndexSelectedDate, 'days').toDate();
      } else if (differenceIndexSelectedDate < 0) {
        mappedDate.subtract(-differenceIndexSelectedDate, 'days').toDate();
      }

      return { date: mappedDate.toDate(), events: [] };
    });
  }
}
