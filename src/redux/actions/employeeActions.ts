import { TSchedule } from '@/types/schedule';
import { ADMIN_GET_EMPLOYEE } from '../actionTypes';
import { supabase } from '../../../supabaseConfig';

export const getAdminEmployee = (schedules: TSchedule[]) => ({
	type: ADMIN_GET_EMPLOYEE,
	payload: schedules,
});

// Supabase에서 검색을 통한 직원 조회
export const getAdminEmployeeSchedules = (value: string) => {
	return async (dispatch) => {
		try {
			const { data, error } = await supabase
				.from('schedules')
				.select('*')
				.or(`user_name.ilike.${value}%, user_alias.ilike.${value}%`);
			console.log(data);

			if (error) throw error;

			dispatch(getAdminEmployee(data));

			return {
				success: true,
				message: 'Supabase 스케줄을 성공적으로 조회했습니다.',
			};
		} catch (error) {
			console.error('Supabase 스케줄 조회 실패:', error);
			return {
				success: false,
				message: 'Supabase 스케줄 조회 중 오류가 발생했습니다.',
			};
		}
	};
};
