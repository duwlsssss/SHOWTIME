import { v4 as uuidv4 } from 'uuid';
import { TSchedule } from '@/types/schedule';
import calculateEndDateTime from './calculateEndDateTime';
import { Timestamp } from 'firebase/firestore';

// UTC → KST 변환 함수
function convertUTCToKST(date: Date): Date {
	const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환해
	return new Date(date.getTime() - kstOffset);
}

// Timestamp → Date 변환 함수
export function toDate(input: Timestamp | Date): Date {
	return input instanceof Timestamp ? input.toDate() : input;
}
// 반복 주기에 따라 스케줄을 생성하는 함수
function generateRepeatingSchedules(schedule: TSchedule): TSchedule[] {
	const schedules: TSchedule[] = [];
	const { repeat, repeat_end_date, start_time, time } = schedule;

	if (!repeat || !repeat_end_date) return [schedule];

	let currDate = convertUTCToKST(toDate(start_time)); // 시작 날짜 및 시간
	const endDate = convertUTCToKST(toDate(repeat_end_date)); // 반복 종료 날짜

	while (currDate <= endDate) {
		schedules.push({
			...schedule,
			schedule_id: uuidv4(), // 각 스케줄마다 고유 ID 생성
			start_time: new Date(currDate),
			end_time: calculateEndDateTime(new Date(currDate), time),
		});

		switch (repeat) {
			case '매일':
				currDate = new Date(currDate.setDate(currDate.getDate() + 1));
				break;
			case '매주':
				currDate = new Date(currDate.setDate(currDate.getDate() + 7));
				break;
			case '매월':
				currDate = new Date(currDate.setMonth(currDate.getMonth() + 1));
				break;
		}
	}

	return schedules;
}

export default generateRepeatingSchedules;
