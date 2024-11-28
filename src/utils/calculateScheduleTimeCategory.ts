import { TScheduleTimeCategory } from '@/types/schedule';

const calculateScheduleTimeCategory = (start_time: Date): TScheduleTimeCategory => {
	const hours = start_time.getHours();

	if (hours >= 6 && hours < 12) return '오픈';
	if (hours < 18) return '미들';
	return '마감';
};

export default calculateScheduleTimeCategory;
