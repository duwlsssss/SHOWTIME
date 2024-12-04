import { TScheduleShiftType } from '@/types/schedule';

export default function calculateScheduleShiftType(start_date_time: Date): TScheduleShiftType {
	const hours = start_date_time.getUTCHours();

	// UTC 기준으로 교대 시간 계산
	if (hours >= 21 || hours < 3) return 'open'; // UTC 21-03 = KST 06-12
	if (hours < 9) return 'middle'; // UTC 03-09 = KST 12-18
	return 'close'; // UTC 09-21 = KST 18-06
}
