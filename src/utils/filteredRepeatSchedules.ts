import { TSchedule } from '@/types/schedule';
import { isSameDate } from './dateFormatter';

export default function filteredRepeatSchedules(schedule: TSchedule, schedules: TSchedule[]) {
	// console.log('스케줄 비교 시작:', { schedule, schedules });
	return schedules.filter((s) => {
		const isUserIdSame = s.user_id === schedule.user_id;
		const isCategorySame = s.category === schedule.category;
		const isTimeSame = s.time === schedule.time;
		const isRepeatSame = s.repeat === schedule.repeat;
		const isRepeatEndDateSame =
			s.repeat_end_date &&
			schedule.repeat_end_date &&
			isSameDate(new Date(s.repeat_end_date), new Date(schedule.repeat_end_date));
		const isShiftTypeSame = s.schedule_shift_type === schedule.schedule_shift_type;

		const match =
			isUserIdSame &&
			isCategorySame &&
			isTimeSame &&
			isRepeatSame &&
			isRepeatEndDateSame &&
			isShiftTypeSame;
		// console.log('비교 결과:', { schedule: s, match });
		return match;
	});
}
