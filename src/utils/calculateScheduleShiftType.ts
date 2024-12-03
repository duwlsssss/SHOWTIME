import { TScheduleShiftType } from '@/types/schedule';

const calculateScheduleShiftType = (start_date_time: Date): TScheduleShiftType => {
	const hours = start_date_time.getHours();
	if (hours >= 6 && hours < 12) return 'open';
	if (hours < 18) return 'middle';
	return 'close';
};

export default calculateScheduleShiftType;
