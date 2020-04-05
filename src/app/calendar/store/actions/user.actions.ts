import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@calendar/model/user';
import { createAction, props } from '@ngrx/store';

export const getUsers = createAction('[User/API] Load Users');

export const getUsersSuccess = createAction('[User/API] Load Users SUCCESS', props<{ users: User[] }>());

export const getUsersFailed = createAction('[User/API] Load Users FAILED', props<{ error: HttpErrorResponse }>());

export const updateSelectedUser = createAction('[User/UI] Update selected user', props<{ selectedUser: User }>());
