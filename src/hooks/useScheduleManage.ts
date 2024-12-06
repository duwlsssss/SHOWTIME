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

export default function useScheduleManage(userId: string | null, schedules: TSchedule[]) {
	const dispatch = useAppDispatch();

	const handleAddSchedule = async (schedules: TSchedule[]) => {
		if (!userId) throw new Error('userId가 없음');

		try {
			const addResult = await dispatch(addScheduleToSupabase(userId, schedules));
			if (!addResult.success) throw new Error('스케줄 추가 실패');
		} catch (error) {
			console.error('스케줄 추가 실패:', error);
			throw error;
		}
	};

	const handleEditSchedule = async (schedule: TSchedule, editAll: boolean) => {
		if (!userId) throw new Error('userId가 없음');

		try {
			if (editAll) {
				// 전체 삭제 선택시 반복 스케줄들 모두 삭제 후 수정
				// 기존 스케줄 삭제부터 함
				const schedulesToDelete = filteredRepeatSchedules(schedule, schedules);
				const scheduleIdsToDelete = schedulesToDelete.map((s) => s.schedule_id);

				// Supabase 삭제
				const deleteResult = await dispatch(
					removeScheduleFromSupabase(userId, scheduleIdsToDelete),
				);

				if (!deleteResult.success) throw new Error('전체 수정 전 삭제 실패');

				const updatedSchedules = generateRepeatingSchedules({
					...schedule,
					schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성해줌
				});

				const addResult = await dispatch(addScheduleToSupabase(userId, updatedSchedules));

				if (!addResult.success) throw new Error('전체 수정 중 추가 실패');
			} else {
				const deleteResult = await dispatch(
					removeScheduleFromSupabase(userId, [schedule.schedule_id]),
				);

				if (!deleteResult.success) throw new Error('단일 수정 전 삭제 실패');

				// 단일 스케줄 수정시에도 repeat, repeat_end_date (반복 설정) 있으면 반복 배열 추가
				const hasRepeat = schedule.repeat && schedule.repeat_end_date;
				if (hasRepeat) {
					// 반복 배열 생성, 추가
					const updatedSchedules = generateRepeatingSchedules({
						...schedule,
						schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성
					});

					const addResult = await dispatch(addScheduleToSupabase(userId, updatedSchedules));
					if (!addResult.success) throw new Error('단일 스케줄 수정이 반복 스케줄로 수정 실패');
				} else {
					const editResult = await dispatch(editScheduleToSupabase([schedule]));

					if (!editResult.success) throw new Error('단일 스케줄 수정 실패');
				}
			}
		} catch (error) {
			console.error('스케줄 수정 실패', error);
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
