import { TSchedule, TScheduleCategory } from '@/types/schedule';
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_SELECTED_SCHEDULE,
	CLEAR_SCHEDULES,
	SET_FILTER_CATEGORY,
	SET_MONTH,
	SET_YEAR,
} from '../actionTypes';
import { supabase } from '../../../supabaseConfig';
import { AppThunk } from '@/redux/store';

export const setSelectedSchedule = (schedule: TSchedule | null) => ({
	type: SET_SELECTED_SCHEDULE,
	payload: schedule,
});

export const getSchedules = (schedules: TSchedule[]) => ({
	type: GET_SCHEDULES,
	payload: schedules,
});

export const clearSchedules = () => ({
	type: CLEAR_SCHEDULES,
});

const addSchedules = (schedules: TSchedule[]) => ({
	type: ADD_SCHEDULES,
	payload: schedules,
});

const editSchedules = (schedules: TSchedule[]) => ({
	type: EDIT_SCHEDULES,
	payload: schedules,
});

const removeSchedules = (scheduleIds: string[]) => ({
	type: REMOVE_SCHEDULES,
	payload: scheduleIds,
});

export const selectDate = (date: Date) => ({
	type: SELECT_DATE,
	payload: date,
});

export const filterSchedules = (schedules: TSchedule[]) => ({
	type: FILTERED_SCHEDULES,
	payload: schedules,
});

export const setfilterCategory = (filterCategoryKey: TScheduleCategory) => ({
	type: SET_FILTER_CATEGORY,
	payload: filterCategoryKey,
});

export const setYear = (year: number) => ({
	type: SET_YEAR,
	payload: year,
});

export const setMonth = (month: number) => ({
	type: SET_MONTH,
	payload: month,
});

// Supabase에 스케줄 추가
export const addScheduleToSupabase = (
	userId: string,
	schedules: TSchedule[],
): AppThunk<Promise<void>> => {
	return async (dispatch): Promise<void> => {
		const formattedSchedules = schedules.map((schedule) => ({
			...schedule,
			user_id: userId,
			// UTC 타임스탬프로 저장
			start_date_time: new Date(schedule.start_date_time).toISOString(),
			end_date_time: new Date(schedule.end_date_time).toISOString(),
			repeat_end_date: schedule.repeat_end_date
				? new Date(schedule.repeat_end_date).toISOString()
				: null,
			created_at: new Date().toISOString(),
		}));

		const { error: supabaseError } = await supabase.from('schedules').insert(formattedSchedules);

		if (supabaseError) {
			throw new Error('Supabase에 스케줄 추가 중 오류가 발생했습니다.');
		}

		dispatch(addSchedules(schedules));
	};
};

// Supabase에서 스케줄 조회
export const getSchedulesFromSupabase = (
	userId?: string,
	value?: string,
): AppThunk<Promise<void>> => {
	return async (dispatch): Promise<void> => {
		let query = supabase.from('schedules').select('*');

		if (value) {
			query = query.or(`category.like.${value}%`);
		}

		if (userId) {
			query = query.eq('user_id', userId);
		}
		const { data, error: supabaseError } = await query;
		if (supabaseError) {
			throw new Error('Supabase 스케줄 조회 중 오류가 발생했습니다.');
		}

		const convertedSchedules = data.map((schedule) => ({
			...schedule,
			start_date_time: new Date(schedule.start_date_time),
			end_date_time: new Date(schedule.end_date_time),
			repeat_end_date: schedule.repeat_end_date ? new Date(schedule.repeat_end_date) : null,
			created_at: new Date(schedule.created_at),
		}));

		dispatch(getSchedules(convertedSchedules));
	};
};

// Supabase에 스케줄 삭제
export const removeScheduleFromSupabase = (
	userId: string,
	scheduleIds: string[],
): AppThunk<Promise<void>> => {
	return async (dispatch): Promise<void> => {
		const { error: supabaseError } = await supabase
			.from('schedules')
			.delete()
			.eq('user_id', userId)
			.in('schedule_id', scheduleIds);

		if (supabaseError) {
			throw new Error('Supabase에 스케줄 삭제 중 오류가 발생했습니다.');
		}

		dispatch(removeSchedules(scheduleIds));
	};
};

// Supabase 스케줄 수정
export const editScheduleToSupabase = (updatedSchedules: TSchedule[]): AppThunk<Promise<void>> => {
	return async (dispatch): Promise<void> => {
		const formattedSchedules = updatedSchedules.map((schedule) => ({
			...schedule,
			start_date_time: new Date(schedule.start_date_time).toISOString(),
			end_date_time: new Date(schedule.end_date_time).toISOString(),
			repeat_end_date: schedule.repeat_end_date
				? new Date(schedule.repeat_end_date).toISOString()
				: null,
		}));

		// 병렬로 여러 스케줄 업데이트
		const promises = formattedSchedules.map((schedule) =>
			supabase.from('schedules').upsert([schedule], { onConflict: 'schedule_id' }),
		);

		const results = await Promise.all(promises);

		const errors = results.filter((result) => result.error);
		if (errors.length > 0) {
			throw new Error('Supabase에 스케줄 수정 중 오류가 발생했습니다.');
		}

		dispatch(editSchedules(updatedSchedules));
	};
};
