import { useAppDispatch } from './useRedux';
import { v4 as uuidv4 } from 'uuid';
import { TSchedule } from '@/types/schedule';
import {
	addScheduleToSupabase,
	editScheduleToSupabase,
	removeScheduleFromSupabase,
} from '@/redux/actions/scheduleActions';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';

export default function useScheduleManage(
	userId: string | null,
	schedules: TSchedule[],
	searchUserId?: string,
) {
	const dispatch = useAppDispatch();

	const handleAddSchedule = async (schedules: TSchedule[]) => {
		if (!userId) throw new Error('userId가 없음');
		const isAdmin = true;
		try {
			const addResult = await dispatch(
				addScheduleToSupabase(isAdmin ? searchUserId! : userId!, schedules),
			);
			if (!addResult.success) throw new Error('스케줄 추가 실패');
		} catch (error) {
			console.error('스케줄 추가 실패:', error);
			throw error;
		}
	};

	const handleEditSchedule = async (
		prevSchedule: TSchedule,
		newSchedule: TSchedule,
		editAll: boolean,
	) => {
		if (!userId) throw new Error('userId가 없음');
		if (!prevSchedule) throw new Error('이전 스케줄 정보 없음');

		const isRepeatChanged = prevSchedule.repeat !== newSchedule.repeat;
		const isRepeatEndDateChanged =
			prevSchedule.repeat_end_date &&
			newSchedule.repeat_end_date &&
			new Date(prevSchedule.repeat_end_date).getTime() !==
				new Date(newSchedule.repeat_end_date).getTime();

		try {
			if (editAll || isRepeatChanged || isRepeatEndDateChanged) {
				// - 전체 수정
				// - 또는 단일 수정시 repeat, repeat_end_date이 수정됐으면
				// 기존 반복 스케줄 전체 삭제
				const scheduleIds = filteredRepeatSchedules(prevSchedule, schedules).map(
					(s) => s.schedule_id,
				);

				console.log('수정 전 삭제할 스케줄:', {
					editAll,
					isRepeatChanged,
					isRepeatEndDateChanged,
					scheduleIds,
				});

				// Supabase 삭제, 추가
				const deleteResult = await dispatch(removeScheduleFromSupabase(userId, scheduleIds));

				if (!deleteResult.success) throw new Error('수정 전 삭제 실패');

				const updatedSchedules = generateRepeatingSchedules({
					...newSchedule,
					schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성해줌
				});

				const addResult = await dispatch(addScheduleToSupabase(userId, updatedSchedules));

				if (!addResult.success) throw new Error('전체 수정 중 추가 실패');
			} else {
				// 단일 스케줄 수정
				const editResult = await dispatch(editScheduleToSupabase([newSchedule]));
				if (!editResult.success) throw new Error('단일 스케줄 수정 실패');
			}
		} catch (error) {
			console.error('스케줄 수정 실패', error);
			throw error;
		}
	};

	const handleDeleteSchedule = async (schedule: TSchedule, deleteAll: boolean) => {
		try {
			if (!userId) throw new Error('userId가 없음');

			const scheduleIds = deleteAll
				? filteredRepeatSchedules(schedule, schedules).map((s) => s.schedule_id)
				: [schedule.schedule_id];

			const deleteResult = await dispatch(removeScheduleFromSupabase(userId, scheduleIds));
			if (!deleteResult.success) throw new Error('삭제 실패');
		} catch (error) {
			console.error('스케줄 삭제 실패:', error);
			throw error;
		}
	};

	return {
		handleAddSchedule,
		handleEditSchedule,
		handleDeleteSchedule,
	};
}
