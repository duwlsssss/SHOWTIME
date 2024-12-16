import { supabase } from '../../supabaseConfig';

// PostgreSQL의 EXTRACT(WEEK FROM date)와 동일한 방식으로 주차 계산
export const getWeekNumber = (date: Date) => {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
	const week1 = new Date(d.getFullYear(), 0, 4);
	return (
		1 +
		Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
	);
};

interface WorkHoursResult {
	weekResult: {
		data: {
			weekly_hours?: number;
		} | null;
	};
	monthResult: {
		data: {
			monthly_hours?: number;
		} | null;
	};
}

export const useWorkingHours = () => {
	const fetchWorkHours = async (userId: string): Promise<WorkHoursResult> => {
		const now = new Date();
		const currentYear = now.getFullYear().toString();
		const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
		const currentWeek = getWeekNumber(now);

		const [weekResult, monthResult] = await Promise.all([
			supabase
				.from('work_hours')
				.select('*')
				.eq('user_id', userId)
				.eq('year', currentYear)
				.eq('month', currentMonth)
				.eq('week_number', currentWeek)
				.maybeSingle(),
			supabase
				.from('work_hours')
				.select('*')
				.eq('user_id', userId)
				.eq('year', currentYear)
				.eq('month', currentMonth)
				.maybeSingle(),
		]);

		return { weekResult, monthResult };
	};

	return {
		fetchWorkHours,
	};
};
