// import { TSchedule } from '@/types/schedule';

// // 반복 조건 충족 여부
// function isRepeatDate(schedule: TSchedule, target: TSchedule): boolean {
// 	const scheduleDate = new Date(schedule.start_date_time);
// 	const targetDate = new Date(target.start_date_time);

// 	switch (schedule.repeat) {
// 		case 'everyDay':
// 			return true;
// 		case 'everyWeek':
// 			return scheduleDate.getDay() === targetDate.getDay();
// 		case 'everyMonth':
// 			return scheduleDate.getDate() === targetDate.getDate();
// 		default:
// 			return false;
// 	}
// }

//  // 반복 범위 내 존재 여부
// function isWithinRepeatRange(schedule: TSchedule, target: TSchedule): boolean {
// 	if (!schedule.repeat || !target.repeat || schedule.repeat !== target.repeat) {
// 		return false;
// 	}

// 	const scheduleStartDate = new Date(schedule.start_date_time);
// 	const scheduleEndDate = schedule.repeat_end_date
// 		? new Date(schedule.repeat_end_date)
// 		: null;

// 	const targetStartDate = new Date(target.start_date_time);
// 	const targetEndDate = target.repeat_end_date
// 		? new Date(target.repeat_end_date)
// 		: null;

// 	if (scheduleEndDate) {
// 		scheduleStartDate.getUTCHours() === 15 ? scheduleEndDate : scheduleEndDate.setUTCHours(23, 59, 59, 999);
// 	}

// 	if (targetEndDate) {
// 		targetStartDate.getUTCHours() === 15 ? targetEndDate : targetEndDate.setUTCHours(23, 59, 59, 999);
// 	}

// 	// 날짜 겹침 확인
// 	if (scheduleEndDate && targetEndDate) {
// 		return (
// 			targetStartDate <= scheduleEndDate && scheduleStartDate <= targetEndDate
// 		);
// 	}

// 	return true; // 종료 날짜가 없으면 계속 반복
// }

// export default function filteredRepeatSchedules(
// 	schedule: TSchedule,
// 	schedules: TSchedule[]
// ) {
//   console.log('스케줄 비교 시작:', { schedule, schedules });
// 	return schedules.filter((s) => {
// 		const match =
// 			s.user_id === schedule.user_id
// 			s.category === schedule.category &&
// 			s.time === schedule.time &&
// 			isRepeatDate(schedule, s) &&
// 			isWithinRepeatRange(schedule, s) &&
// 			s.schedule_shift_type === schedule.schedule_shift_type
// 		console.log('비교 결과:', { schedule: s, match });
// 		return match;
// 	});
// }

import { TSchedule } from '@/types/schedule';

export default function filteredRepeatSchedules(schedule: TSchedule, schedules: TSchedule[]) {
	// console.log('스케줄 비교 시작:', { schedule, schedules });
	return schedules.filter((s) => {
		const match =
			s.category === schedule.category &&
			s.time === schedule.time &&
			s.repeat === schedule.repeat &&
			s.schedule_shift_type === schedule.schedule_shift_type;

		// console.log('비교 결과:', { schedule: s, match });
		return match;
	});
}
