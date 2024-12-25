import { TUser } from '@/types/auth';
import { ADMIN_GET_EMPLOYEE } from '../actionTypes';
import { supabase } from '../../../supabaseConfig';
import { AppThunk } from '@/redux/store';

export const getAdminEmployee = (users: TUser[]) => ({
	type: ADMIN_GET_EMPLOYEE,
	payload: users,
});

// Supabase에서 검색을 통한 직원 조회
export const getAdminEmployees = (value: string): AppThunk<Promise<void>> => {
	return async (dispatch): Promise<void> => {
		const { data, error: supabaseError } = await supabase
			.from('users')
			.select('*')
			.or(`user_name.ilike.%${value}%, user_alias.ilike.%${value}%`);

		if (supabaseError) {
			throw new Error('Supabase 직원 조회 중 오류가 발생했습니다.');
		}

		const transformedData = data?.map((user) => ({
			...user,
			userName: user.user_name,
			userAlias: user.user_alias,
			phoneNumber: user.phone_number,
		}));

		dispatch(getAdminEmployee(transformedData));
	};
};
