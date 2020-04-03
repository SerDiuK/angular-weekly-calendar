import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from '@calendar/model/user';
import { UserService } from '@calendar/services/user.service';
import { usersMock } from '@calendar/services/user.service.spec';
import * as UserActions from '@calendar/store/actions/user.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let service: UserService;

  const serviceStub: Partial<UserService> = {
    getUsers(): Observable<User[]> {
      return of(usersMock);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useValue: serviceStub,
        },
      ],
    });

    effects = TestBed.inject<UserEffects>(UserEffects);
    service = TestBed.inject(UserService);
  });

  it('should return getUserSuccess when loading a user is successful', () => {
    spyOn(service, 'getUsers').and.callThrough();

    actions$ = hot('-a-', { a: UserActions.getUsers() });
    const expected = cold('-b-', {
      b: UserActions.getUsersSuccess({ users: usersMock }),
    });

    expect(effects.onGetUsers$).toBeObservable(expected);
  });

  it('should return getUserFailed when loading a user is unsuccessful', () => {
    spyOn(service, 'getUsers').and.returnValue(throwError(new Error('error')));

    actions$ = hot('-a-', { a: UserActions.getUsers() });
    const expected = cold('-b-', {
      b: UserActions.getUsersFailed({ error: new Error('error') as HttpErrorResponse }),
    });

    expect(effects.onGetUsers$).toBeObservable(expected);
  });
});
