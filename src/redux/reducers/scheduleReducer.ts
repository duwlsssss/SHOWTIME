import { TSchedule, TScheduleState } from '@/types/schedule';

import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
} from '../actionTypes';

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: null,
	filteredSchedules: [],
};

function scheduleReducer(state: TScheduleState = initialState, action: any): TScheduleState {
	switch (action.type) {
		case GET_SCHEDULES:
			return { ...state, schedules: action.payload };
		case ADD_SCHEDULES:
			return { ...state, schedules: [...state.schedules, ...action.payload] };
		case EDIT_SCHEDULES:
			return {
				...state,
				schedules: state.schedules.map(
					(s) => action.payload.find((edit: TSchedule) => edit.schedule_id === s.schedule_id) ?? s,
				),
			};
		case REMOVE_SCHEDULES:
			return {
				...state,
				schedules: state.schedules.filter((s) => !action.payload.includes(s.schedule_id)),
			};
		case SELECT_DATE:
			return { ...state, selectedDate: action.payload };
		case FILTERED_SCHEDULES:
			return { ...state, filteredSchedules: action.payload };
		default:
			return state;
	}
}

export default scheduleReducer;
