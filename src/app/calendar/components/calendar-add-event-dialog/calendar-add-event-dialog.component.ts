import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './calendar-add-event-dialog.component.html',
  styleUrls: ['./calendar-add-event-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarAddEventDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
