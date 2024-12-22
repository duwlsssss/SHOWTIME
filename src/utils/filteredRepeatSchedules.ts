import { TSchedule } from '@/types/schedule';
import { isSameDate } from './dateFormatter';

export default function filteredRepeatSchedules(
	schedule: TSchedule,
	schedules: TSchedule[],
	isUser?: boolean,
) {
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

		// 사용자일때는 오늘 이후 스케줄만 필터링
		const isFutureSchedule = isUser
			? new Date(s.start_date_time).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
			: true;

		const match =
			isUserIdSame &&
			isCategorySame &&
			isTimeSame &&
			isRepeatSame &&
			isRepeatEndDateSame &&
			isShiftTypeSame &&
			isFutureSchedule;
		// console.log('비교 결과:', { schedule: s, match });
		return match;
	});
}
