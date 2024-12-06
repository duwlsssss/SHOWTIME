import { TSchedule, TScheduleState } from '@/types/schedule';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';

import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	SET_SELECTED_SCHEDULE,
} from '../actionTypes';
import { AnyAction } from 'redux';

// 중복 제거 함수
function dedupeSchedules(schedules: TSchedule[]): TSchedule[] {
	return Array.from(
		new Map(schedules.map((schedule) => [schedule.schedule_id, schedule])).values(),
	);
}

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: new Date(),
	filteredSchedules: [],
	isLoading: false,
	selectedSchedule: null,
};

export default function scheduleReducer(
	state: TScheduleState = initialState,
	action: AnyAction,
): TScheduleState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case SET_SELECTED_SCHEDULE:
			return { ...state, selectedSchedule: action.payload };
		case GET_SCHEDULES:
			return { ...state, schedules: dedupeSchedules(action.payload), isLoading: false };
		case ADD_SCHEDULES:
			return {
				...state,
				schedules: dedupeSchedules([...state.schedules, ...action.payload]),
				isLoading: false,
			};
		case EDIT_SCHEDULES: {
			const scheduleMap = new Map(
				state.schedules.map((schedule) => [schedule.schedule_id, schedule]),
			);
			action.payload.forEach((schedule: TSchedule) =>
				scheduleMap.set(schedule.schedule_id, schedule),
			);
			const updatedSchedules = Array.from(scheduleMap.values());

			return {
				...state,
				schedules: updatedSchedules,
				filteredSchedules: state.selectedDate
					? filterSchedulesByDateAndSort(updatedSchedules, state.selectedDate)
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
			return { ...state, selectedDate: new Date(action.payload), isLoading: false };
		case FILTERED_SCHEDULES:
			return { ...state, filteredSchedules: action.payload, isLoading: false };
		default:
			return state;
	}
}
