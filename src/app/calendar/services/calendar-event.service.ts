import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from '@calendar/model/calendar-event';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventService {
  readonly baseUrl = `${environment.apiUrl}/calendar-events`;

  constructor(private readonly http: HttpClient) {}

  getCalendarEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.baseUrl);
  }

  addCalendarEvent(body: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(this.baseUrl, body);
  }

  updateCalendarEvent(body: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(this.baseUrl, body);
  }

  deleteCalendarEvent(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/${id}`);
  }
}
