import { Timestamp } from 'firebase/firestore';

export type TScheduleCategory = '매표' | '매점' | '플로어';
export type TScheduleTimeCategory = '오픈' | '미들' | '마감';
export type TScheduleRepeatCycle = '매일' | '매주' | '매월';

export interface TSchedule {
	schedule_id: string;
	category: TScheduleCategory;
	start_date_time: Date | Timestamp; // firestore에서는 Timestamp로 저장됨
	time: string;
	end_date_time?: Date | Timestamp; // 계산된 종료 시간
	scheduleTimeCategory?: TScheduleTimeCategory; // 계산된 오픈, 미들, 마감
	repeat?: TScheduleRepeatCycle;
	repeat_end_date?: Date | Timestamp;
	created_at: Date | Timestamp;
	description?: string;
}

export interface TSchedules {
	schedules: TSchedule[];
}

export interface TCalendarState {
	selectedDate: Date | Timestamp;
	filteredSchedules: TSchedule[];
	isLoading: boolean;
}

export type TScheduleState = TSchedules & TCalendarState;

// action types
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
} from '@/redux/actionTypes';

export interface GetSchedulesAction {
	type: typeof GET_SCHEDULES;
	payload: TSchedule[];
}

export interface AddSchedulesAction {
	type: typeof ADD_SCHEDULES;
	payload: TSchedule[];
}

export interface EditSchedulesAction {
	type: typeof EDIT_SCHEDULES;
	payload: TSchedule[];
}

export interface RemoveSchedulesAction {
	type: typeof REMOVE_SCHEDULES;
	payload: string[];
}

export interface SelectDateAction {
	type: typeof SELECT_DATE;
	payload: Date | null;
}

export interface FilteredSchedulesAction {
	type: typeof FILTERED_SCHEDULES;
	payload: TSchedule[];
}

export interface SetLoadingAction {
	type: typeof SET_LOADING;
	payload: boolean;
}

export type ScheduleActionTypes =
	| GetSchedulesAction
	| AddSchedulesAction
	| EditSchedulesAction
	| RemoveSchedulesAction
	| SelectDateAction
	| FilteredSchedulesAction
	| SetLoadingAction;

export interface scheduleApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}
