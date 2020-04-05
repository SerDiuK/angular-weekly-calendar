import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const updateSelectedDate = createAction('[UI/API] Update chosen date', props<{ selectedDate: Moment }>());
