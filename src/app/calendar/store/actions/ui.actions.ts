import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const updateChosenDate = createAction('[UI/API] Update chosen date', props<{ chosenDate: Moment }>());
