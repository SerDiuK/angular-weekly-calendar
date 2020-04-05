import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { usersMock } from '@calendar/services/user.service.spec';
import { selectUsers } from '@calendar/store';
import { provideMockStore } from '@ngrx/store/testing';

import { CalendarEventDialogComponent } from './calendar-event-dialog.component';

describe('CalendarEventDialogComponent', () => {
  let component: CalendarEventDialogComponent;
  let fixture: ComponentFixture<CalendarEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarEventDialogComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectUsers, value: usersMock }],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
