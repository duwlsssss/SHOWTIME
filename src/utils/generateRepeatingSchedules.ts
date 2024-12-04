import { TSchedule } from '@/types/schedule';
import calculateEndDateTime from './calculateEndDateTime';
import { v4 as uuidv4 } from 'uuid';

// 반복 주기에 따라 스케줄을 생성하는 함수
export default function generateRepeatingSchedules(schedule: TSchedule): TSchedule[] {
	const schedules: TSchedule[] = [];
	const { repeat, repeat_end_date, start_date_time, time } = schedule;

	let currDate = new Date(start_date_time); // 시작 날짜 및 시간 - UTC로 DB에 저장

	// 반복 설정이 없으면 해당 스케줄만 반환
	if (!repeat || !repeat_end_date) {
		return [schedule];
	}

	// 반복 종료 날짜를 종료일의 다음날 자정으로 설정 (종료일 포함)
	const endDate = new Date(repeat_end_date);
	endDate.setUTCDate(endDate.getUTCDate() + 1);

	// 첫번째 스케줄은 기존 ID 유지
	let isFirst = true;

	while (currDate < endDate) {
		// UTC로 저장
		schedules.push({
			...schedule,
			schedule_id: isFirst ? schedule.schedule_id : uuidv4(),
			start_date_time: new Date(currDate),
			end_date_time: calculateEndDateTime(new Date(currDate), time),
		});

		isFirst = false;

		switch (repeat) {
			case 'everyDay':
				currDate = new Date(currDate.setUTCDate(currDate.getUTCDate() + 1));
				break;
			case 'everyWeek':
				currDate = new Date(currDate.setUTCDate(currDate.getUTCDate() + 7));
				break;
			case 'everyMonth':
				currDate = new Date(currDate.setUTCMonth(currDate.getUTCMonth() + 1));
				break;
			default:
				throw new Error('반복 주기 설정이 잘못되었습니다.');
		}
	}

	return schedules;
}
