import { supabase } from '../../supabaseConfig';

// PostgreSQL의 DATE_PART('week', date)와 동일한 계산
export const getWeekNumber = (date: Date) => {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
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
			// 주간 합계
			supabase
				.from('work_hours')
				.select('weekly_hours')
				.eq('user_id', userId)
				.eq('year', currentYear)
				.eq('month', currentMonth)
				.eq('week_number', currentWeek),

			// 월간 합계
			supabase
				.from('work_hours')
				.select('monthly_hours')
				.eq('user_id', userId)
				.eq('year', currentYear)
				.eq('month', currentMonth),
		]);

		// 합계 계산
		const weeklyTotal =
			weekResult.data?.reduce((sum, record) => sum + (record.weekly_hours || 0), 0) || 0;

		const monthlyTotal =
			monthResult.data?.reduce((sum, record) => sum + (record.monthly_hours || 0), 0) || 0;

		return {
			weekResult: {
				data: {
					weekly_hours: weeklyTotal,
				},
			},
			monthResult: {
				data: {
					monthly_hours: monthlyTotal,
				},
			},
		};
	};

	return {
		fetchWorkHours,
	};
};
