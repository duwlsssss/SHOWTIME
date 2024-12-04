import { TSchedule, TScheduleState } from '@/types/schedule';
import { filterSchedulesByDate } from '@/utils/filterSchedulesByDate';

import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	SET_SCHEDULE_MODAL_OPEN,
	ADMIN_GET_SCHEDULES,
} from '../actionTypes';

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: new Date(),
	filteredSchedules: [],
	isLoading: false,
	isScheduleModalOpen: false,
};

export default function scheduleReducer(
	state: TScheduleState = initialState,
	action: any,
): TScheduleState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case SET_SCHEDULE_MODAL_OPEN:
			return { ...state, isScheduleModalOpen: action.payload };
		case GET_SCHEDULES:
			return { ...state, schedules: action.payload, isLoading: false };
		case ADD_SCHEDULES:
			return { ...state, schedules: [...state.schedules, ...action.payload], isLoading: false };
		case ADMIN_GET_SCHEDULES: {
			const uniqueSchedules = [...state.schedules, ...action.payload].filter(
				(schedule, index, self) =>
					index === self.findIndex((s) => s.schedule_id === schedule.schedule_id),
			);
			return { ...state, schedules: uniqueSchedules, isLoading: false };
		}
		case EDIT_SCHEDULES: {
			const updatedSchedules = state.schedules.map((s) => {
				const updated = action.payload.find(
					(edit: TSchedule) => edit.schedule_id === s.schedule_id,
				);
				return updated ? updated : s;
			});
			return {
				...state,
				schedules: updatedSchedules,
				filteredSchedules: state.selectedDate
					? filterSchedulesByDate(updatedSchedules, state.selectedDate as Date)
					: updatedSchedules,
				isLoading: false,
			};
		}
		case REMOVE_SCHEDULES: {
			const { payload: scheduleIds } = action;
			return {
				...state,
				schedules: state.schedules.filter(
					(schedule) => !scheduleIds.includes(schedule.schedule_id),
				),
				filteredSchedules: state.filteredSchedules.filter(
					(schedule) => !scheduleIds.includes(schedule.schedule_id),
				),
				isLoading: false,
			};
		}
		case SELECT_DATE:
			return { ...state, selectedDate: action.payload, isLoading: false };
		case FILTERED_SCHEDULES:
			return { ...state, filteredSchedules: action.payload, isLoading: false };
		default:
			return state;
	}
}
