import { TSchedule } from '@/types/schedule';
import { toDate } from './dateFormatter';
import { Timestamp } from 'firebase/firestore';

export function filterSchedulesByDate(schedules: TSchedule[], selectedDate: Date): TSchedule[] {
	return schedules.filter(
		(schedule) =>
			toDate(schedule.start_date_time).toDateString() === toDate(selectedDate).toDateString() ||
			(schedule.end_date_time
				? toDate(schedule.end_date_time).toDateString() === toDate(selectedDate).toDateString()
				: true),
	);
}

export const filterSchedulesByDateAndSort = (schedules: TSchedule[], selectedDate: Date) => {
	return schedules
		.filter((schedule) => {
			const scheduleDate =
				schedule.start_date_time instanceof Timestamp
					? schedule.start_date_time.toDate()
					: new Date(schedule.start_date_time); // 문자열을 Date 객체로 변환

			return scheduleDate.toDateString() === selectedDate.toDateString();
		})
		.sort((a, b) => {
			const aDate =
				a.start_date_time instanceof Timestamp
					? a.start_date_time.toDate()
					: new Date(a.start_date_time);
			const bDate =
				b.start_date_time instanceof Timestamp
					? b.start_date_time.toDate()
					: new Date(b.start_date_time);

			return aDate.getTime() - bDate.getTime();
		});
};
