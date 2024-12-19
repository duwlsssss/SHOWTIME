import { TSchedule } from '@/types/schedule';
import { ADMIN_GET_EMPLOYEE } from '../actionTypes';
import { supabase } from '../../../supabaseConfig';
import { AppThunk } from '@/redux/store';

export const getAdminEmployee = (schedules: TSchedule[]) => ({
	type: ADMIN_GET_EMPLOYEE,
	payload: schedules,
});

// Supabase에서 검색을 통한 직원 조회
export const getAdminEmployeeSchedules = (value: string): AppThunk<Promise<void>> => {
	return async (dispatch): Promise<void> => {
		const { data, error: supabaseError } = await supabase
			.from('schedules')
			.select('*')
			.or(`user_name.ilike.%${value}%, user_alias.ilike.%${value}%`);

		// console.log(`${value} 직원 스케줄`, data);

		if (supabaseError) {
			throw new Error('Supabase 직원 스케줄 조회 중 오류가 발생했습니다.');
		}

		dispatch(getAdminEmployee(data));
	};
};
