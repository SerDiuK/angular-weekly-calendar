import { Injectable } from '@angular/core';
import { UserService } from '@calendar/services/user.service';
import * as UserActions from '@calendar/store/actions/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  onGetUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.getUsersSuccess({ users })),
          catchError((error) => of(UserActions.getUsersFailed({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private readonly userService: UserService) {}
}
