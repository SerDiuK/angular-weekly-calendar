import { createAction, props } from '@ngrx/store';

export const updateSelectedDate = createAction('[UI/API] Update chosen date', props<{ selectedDate: Date }>());
