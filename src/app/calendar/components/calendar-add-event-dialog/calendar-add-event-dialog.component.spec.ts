import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAddEventDialogComponent } from './calendar-add-event-dialog.component';

describe('CalendarAddEventDialogComponent', () => {
  let component: CalendarAddEventDialogComponent;
  let fixture: ComponentFixture<CalendarAddEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAddEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAddEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
