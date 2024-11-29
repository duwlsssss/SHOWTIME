import { TSchedule } from '@/types/schedule';
import { toDate } from './dateFormatter';

export function filterSchedulesByDate(schedules: TSchedule[], selectedDate: Date): TSchedule[] {
	return schedules.filter(
		(schedule) =>
			toDate(schedule.start_date_time).toDateString() === toDate(selectedDate).toDateString() ||
			(schedule.end_date_time
				? toDate(schedule.end_date_time).toDateString() === toDate(selectedDate).toDateString()
				: true),
	);
}

export function filterSchedulesByDateAndSort(
	schedules: TSchedule[],
	selectedDate: Date,
): TSchedule[] {
	return schedules
		.filter(
			(schedule) =>
				toDate(schedule.start_date_time).toDateString() === selectedDate.toDateString() ||
				(schedule.end_date_time
					? toDate(schedule.end_date_time).toDateString() === selectedDate.toDateString()
					: true),
		)
		.sort((a, b) => toDate(a.start_date_time).getTime() - toDate(b.start_date_time).getTime()); // 시작 날짜 오름차순
}
