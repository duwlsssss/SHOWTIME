import { TSchedule } from '@/types/schedule';
import { isSameDate } from './dateFormatter';

// 데이터 필터링
// 시작, 끝나는 시간 체크, 시작시간으로 정렬
export function filterSchedulesByDateAndSort(
	schedules: TSchedule[],
	selectedDate: Date,
): TSchedule[] {
	return schedules
		.filter((schedule) => {
			const scheduleDate = new Date(schedule.start_date_time);
			const compareDate = new Date(selectedDate);
			return (
				isSameDate(scheduleDate, compareDate) ||
				(schedule.end_date_time ? isSameDate(new Date(schedule.end_date_time), compareDate) : true)
			);
		})
		.sort((a, b) => {
			const aDate = new Date(a.start_date_time);
			const bDate = new Date(b.start_date_time);
			return aDate.getUTCHours() - bDate.getUTCHours(); // 정렬은 UTC 기준_DB에 저장된 시간이 UTC
		});
}
