import { TSchedule } from '@/types/schedule';

export default function filteredRepeatSchedules(schedule: TSchedule, schedules: TSchedule[]) {
	// console.log('스케줄 비교 시작:', { schedule, schedules });
	return schedules.filter((s) => {
		const match =
			s.category === schedule.category &&
			s.time === schedule.time &&
			s.repeat === schedule.repeat &&
			s.schedule_shift_type === schedule.schedule_shift_type &&
			s.description === schedule.description;

		// console.log('비교 결과:', { schedule: s, match });
		return match;
	});
}
