import { AppThunk } from '@/redux/store';
import { TScheduleApiResponse, TSchedule } from '@/types/schedule';
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	SET_MODAL_OPEN,
	ADMIN_GET_SCHEDULES,
} from '../actionTypes';
import { supabase } from '../../../supabaseConfig';

export const setisLoading = (isLoading: boolean) => ({
	type: SET_LOADING,
	payload: isLoading,
});

export const getAdminSchedules = (schedules: TSchedule[]) => ({
	type: ADMIN_GET_SCHEDULES,
	payload: schedules,
});

//스케줄 추가, 수정 모달 상태
export const setIsModalOpen = (isScheduleModalOpen: boolean) => ({
	type: SET_MODAL_OPEN,
	payload: isScheduleModalOpen,
});

export const getSchedules = (schedules: TSchedule[]) => ({
	type: GET_SCHEDULES,
	payload: schedules,
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

export const addScheduleToSupabase = (
	userId: string,
	schedules: TSchedule[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch) => {
		try {
			dispatch(setisLoading(true));

			const { error: supabaseError } = await supabase.from('schedules').insert(
				schedules.map((schedule) => ({
					...schedule,
					user_id: userId,
					// UTC 타임스탬프로 저장
					start_date_time: new Date(schedule.start_date_time).toISOString(),
					end_date_time: new Date(schedule.end_date_time).toISOString(),
					repeat_end_date: schedule.repeat_end_date
						? new Date(schedule.repeat_end_date).toISOString()
						: null,
					created_at: new Date().toISOString(),
				})),
			);

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
	userId: string,
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch) => {
		try {
			const { data, error } = await supabase.from('schedules').select('*').eq('user_id', userId);

			if (error) throw error;

			// timestamp 문자열을 Date 객체로 변환
			const convertedData = data.map((schedule) => ({
				...schedule,
				start_date_time: new Date(schedule.start_date_time),
				end_date_time: new Date(schedule.end_date_time),
				repeat_end_date: schedule.repeat_end_date ? new Date(schedule.repeat_end_date) : null,
				created_at: new Date(schedule.created_at),
			}));

			// console.log('Supabase 스케줄 조회 결과:', convertedData);
			dispatch(getSchedules(convertedData));

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
	return async (dispatch) => {
		try {
			dispatch(setisLoading(true));
			// Supabase 삭제
			const { error } = await supabase
				.from('schedules')
				.delete()
				.eq('user_id', userId)
				.in('schedule_id', scheduleIds);

			if (error) throw error;

			console.log('Supabase 스케줄 삭제 성공:', scheduleIds); // 콘솔 확인용
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
	userId: string,
	updatedSchedules: TSchedule[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch) => {
		try {
			dispatch(setisLoading(true));

			const { error } = await supabase.from('schedules').upsert(
				updatedSchedules.map((schedule) => ({
					...schedule,
					start_date_time: new Date(schedule.start_date_time).toISOString(),
					end_date_time: new Date(schedule.end_date_time).toISOString(),
					repeat_end_date: schedule.repeat_end_date
						? new Date(schedule.repeat_end_date).toISOString()
						: null,
				})),
				{ onConflict: 'schedule_id' },
			);

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
