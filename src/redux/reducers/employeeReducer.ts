import { ADMIN_GET_EMPLOYEE } from '../actionTypes';
import { TScheduleState } from '@/types/schedule';
import { AnyAction } from 'redux';

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: new Date(),
	filteredSchedules: [],
	isLoading: false,
	selectedSchedule: null,
};

export default function employeeReducer(
	state: TScheduleState = initialState,
	action: AnyAction,
): TScheduleState {
	switch (action.type) {
		case ADMIN_GET_EMPLOYEE: {
			return { ...state, schedules: [...action.payload], isLoading: false };
		}

		default:
			return { ...state };
	}
}
