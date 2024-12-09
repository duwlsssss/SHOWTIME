// reducer.js
import { ADMIN_GET_EMPLYEE } from '../actionTypes';
import { TScheduleState } from '@/types/schedule';
import { AnyAction } from 'redux';

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: new Date(),
	filteredSchedules: [],
	isLoading: false,
	selectedSchedule: null,
};

export default function emplyeeReducer(
	state: TScheduleState = initialState,
	action: AnyAction,
): TScheduleState {
	switch (action.type) {
		case ADMIN_GET_EMPLYEE: {
			return { ...state, schedules: [...action.payload], isLoading: false };
		}

		default:
			return { ...state };
	}
}
