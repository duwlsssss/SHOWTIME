import { AppThunk } from '@/redux/store';
import { TScheduleApiResponse, TSchedule, TScheduleCategory } from '@/types/schedule';
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING, // suspanse로 바꿔야함
	SET_SELECTED_SCHEDULE,
	CLEAR_SCHEDULES,
	SET_FILTER_CATEGORY,
	SET_MONTH,
	SET_YEAR,
} from '../actionTypes';
import { supabase } from '../../../supabaseConfig';

// suspanse로 바꿔야함
export const setisLoading = (isLoading: boolean) => ({
	type: SET_LOADING,
	payload: isLoading,
});

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
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch): Promise<TScheduleApiResponse<void>> => {
		try {
			dispatch(setisLoading(true));

			const formattedSchedules = schedules.map((schedule) => ({
				...schedule,
				user_id: userId,
				// UTC 타임스탬프로 저장
				start_date_time: new Date(schedule.start_date_time).toISOString(),
				end_date_time: new Date(schedule.end_date_time).toISOString(),
				repeat_end_date: schedule.repeat_end_date
					? new Date(schedule.repeat_end_date).toISOString()
					: undefined,
				created_at: new Date().toISOString(),
			}));

			const { error: supabaseError } = await supabase.from('schedules').insert(formattedSchedules);

			if (supabaseError) throw supabaseError;

			dispatch(addSchedules(schedules));

			return {
				success: true,
				message: 'Supabase에 스케줄을 성공적으로 추가했습니다.',
			};
		} catch (error) {
			console.error('Supabase 스케줄 추가 실패:', error);
			return {
				success: false,
				message: 'Supabase 스케줄 추가 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false));
		}
	};
};

// Supabase에서 스케줄 조회
export const getSchedulesFromSupabase = (
	userId?: string,
	value?: string,
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch): Promise<TScheduleApiResponse<void>> => {
		try {
			let query = supabase.from('schedules').select('*');

			if (value) {
				query = query.or(`category.like.${value}%`);
			}

			if (userId) {
				query = query.eq('user_id', userId);
			}
			const { data, error } = await query;
			if (error) throw error;

			const convertedSchedules = data.map((schedule) => ({
				...schedule,
				start_date_time: new Date(schedule.start_date_time),
				end_date_time: new Date(schedule.end_date_time),
				repeat_end_date: schedule.repeat_end_date ? new Date(schedule.repeat_end_date) : undefined,
				created_at: new Date(schedule.created_at),
			}));

			dispatch(getSchedules(convertedSchedules));

			return {
				success: true,
				message: 'Supabase 스케줄을 성공적으로 조회했습니다.',
			};
		} catch (error) {
			console.error('Supabase 스케줄 조회 실패:', error);
			return {
				success: false,
				message: 'Supabase 스케줄 조회 중 오류가 발생했습니다.',
			};
		}
	};
};

// Supabase에 스케줄 삭제
export const removeScheduleFromSupabase = (
	userId: string,
	scheduleIds: string[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch): Promise<TScheduleApiResponse<void>> => {
		try {
			dispatch(setisLoading(true));
			// Supabase 삭제
			const { error } = await supabase
				.from('schedules')
				.delete()
				.eq('user_id', userId)
				.in('schedule_id', scheduleIds);

			if (error) throw error;

			dispatch(removeSchedules(scheduleIds));

			return {
				success: true,
				message: '스케줄을 성공적으로 삭제했습니다.',
			};
		} catch (error) {
			console.error('Supabase 스케줄 삭제 실패:', error);
			return {
				success: false,
				message: '스케줄 삭제 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false));
		}
	};
};

// Supabase 스케줄 수정
export const editScheduleToSupabase = (
	updatedSchedules: TSchedule[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch): Promise<TScheduleApiResponse<void>> => {
		try {
			dispatch(setisLoading(true));

			const formattedSchedules = updatedSchedules.map((schedule) => ({
				...schedule,
				start_date_time: new Date(schedule.start_date_time).toISOString(),
				end_date_time: new Date(schedule.end_date_time).toISOString(),
				repeat_end_date: schedule.repeat_end_date
					? new Date(schedule.repeat_end_date).toISOString()
					: undefined,
			}));

			const { error } = await supabase.from('schedules').upsert(formattedSchedules, {
				onConflict: 'schedule_id',
			});

			if (error) throw error;

			dispatch(editSchedules(updatedSchedules));

			return {
				success: true,
				message: 'Supabase 스케줄을 성공적으로 수정했습니다.',
			};
		} catch (error) {
			console.error('Supabase 스케줄 수정 실패:', error);
			return {
				success: false,
				message: 'Supabase 스케줄 수정 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false));
		}
	};
};
