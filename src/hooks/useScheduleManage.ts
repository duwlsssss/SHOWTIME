import { useAppDispatch } from './useRedux';
import { v4 as uuidv4 } from 'uuid';
import { TSchedule, TDate } from '@/types/schedule';
import {
	addScheduleToSupabase,
	editScheduleToSupabase,
	removeScheduleFromSupabase,
} from '@/redux/actions/scheduleActions';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
import { isSameDate, isSameDateTime } from '@/utils/dateFormatter';

export default function useScheduleManage(userId: string, schedules: TSchedule[]) {
	const dispatch = useAppDispatch();

	// 스케줄 삭제 함수
	const deleteSchedules = async (scheduleIds: string[]) => {
		const deleteResult = await dispatch(removeScheduleFromSupabase(userId, scheduleIds));
		if (!deleteResult.success) throw new Error('스케줄 삭제 실패');
	};

	// 반복 스케줄들에서 이전 스케줄들 종료 날짜 수정 함수
	const adjustPreviousSchedules = async (
		repeatSchedules: TSchedule[],
		targetIndex: number,
		targetStartDate: TDate,
	) => {
		const prevSchedules = repeatSchedules.slice(0, targetIndex).map((prev) => {
			const prevEndDate = new Date(targetStartDate);
			prevEndDate.setUTCDate(prevEndDate.getUTCDate() - 1); // 종료 날짜를 대상 스케줄 이전으로 설정
			return {
				...prev,
				repeat_end_date: prevEndDate,
			};
		});

		await dispatch(editScheduleToSupabase([...prevSchedules]));
	};

	// 스케줄 추가 핸들러
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

	// 스케줄 수정 핸들러
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
			!isSameDate(new Date(prevSchedule.repeat_end_date), new Date(newSchedule.repeat_end_date));
		const isStartDateChanged = !isSameDateTime(
			new Date(prevSchedule.start_date_time),
			new Date(newSchedule.start_date_time),
		);

		try {
			// 기존 반복 스케줄 계산
			const repeatSchedules = filteredRepeatSchedules(prevSchedule, schedules);

			// 전체 수정
			if (editAll) {
				// 기존 반복 스케줄 전체 삭제
				const scheduleIds = repeatSchedules.map((s) => s.schedule_id);
				await deleteSchedules(scheduleIds);

				// start_date_time이 바뀌지 않았으면 기존 반복 스케줄의 첫번째 요소로 반복 스케줄 생성해야함
				const baseStartDateTime = isStartDateChanged
					? newSchedule.start_date_time // 새 start_date_time 반영
					: repeatSchedules[0].start_date_time; // 기존 반복 스케줄의 첫번째 요소 사용

				// 새 반복 스케줄 생성
				const updatedSchedules = generateRepeatingSchedules({
					...newSchedule,
					start_date_time: baseStartDateTime,
					schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성해줌
				});

				// Supabase 추가
				await dispatch(addScheduleToSupabase(userId, updatedSchedules));
				return;
			}

			// 단일 수정

			// 반복 스케줄인 경우
			else if (repeatSchedules.length > 1) {
				const targetIndex = repeatSchedules.findIndex(
					(s) => s.schedule_id === prevSchedule.schedule_id,
				);

				// 날짜 변경, 반복설정 변경이 없으면 반복 설정 제거
				if (!isRepeatChanged && !isRepeatEndDateChanged && !isStartDateChanged) {
					const updatedSchedule = {
						...newSchedule,
						repeat: undefined,
						repeat_end_date: undefined,
					};

					await dispatch(editScheduleToSupabase([updatedSchedule]));
					await adjustPreviousSchedules(repeatSchedules, targetIndex, prevSchedule.start_date_time);
					return;
				}

				// 날짜 변경, 반복설정 변경이 있으면
				await deleteSchedules([prevSchedule.schedule_id]);
				await adjustPreviousSchedules(repeatSchedules, targetIndex, prevSchedule.start_date_time);

				// newSchedule 기준으로 새 반복 스케줄 추가
				const newRepeatingSchedules = generateRepeatingSchedules({
					...newSchedule,
					schedule_id: uuidv4(),
				});

				await dispatch(addScheduleToSupabase(userId, newRepeatingSchedules));
				return;
			}

			// 반복 설정이 없지만 repeat 또는 repeat_end_date가 변경된 경우
			if (isRepeatChanged || isRepeatEndDateChanged) {
				await deleteSchedules([prevSchedule.schedule_id]);
				const newRepeatingSchedules = generateRepeatingSchedules({
					...newSchedule,
					schedule_id: uuidv4(),
				});
				await dispatch(addScheduleToSupabase(userId, newRepeatingSchedules));
				return;
			}

			// 반복 설정 없음
			await dispatch(editScheduleToSupabase([newSchedule]));
		} catch (error) {
			console.error('스케줄 수정 실패', error);
			throw error;
		}
	};

	// 스케줄 삭제 핸들러
	const handleDeleteSchedule = async (schedule: TSchedule, deleteAll: boolean) => {
		try {
			if (!userId) throw new Error('userId가 없음');

			const repeatSchedules = filteredRepeatSchedules(schedule, schedules);

			const scheduleIds = deleteAll
				? repeatSchedules.map((s) => s.schedule_id)
				: [schedule.schedule_id];

			await deleteSchedules(scheduleIds);

			// 반복 스케줄 중 삭제가 일어나면 전 반복 스케줄의 반복 종료 날짜 조정 필요
			if (!deleteAll && repeatSchedules.length > 1) {
				const targetIndex = repeatSchedules.findIndex(
					(s) => s.schedule_id === schedule.schedule_id,
				);
				await adjustPreviousSchedules(repeatSchedules, targetIndex, schedule.start_date_time);
			}
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
