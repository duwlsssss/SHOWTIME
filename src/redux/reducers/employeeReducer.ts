import { ADMIN_GET_EMPLOYEE } from '../actionTypes';
import { TUser } from '@/types/auth';
import { TEmployeeState } from '@/types/employee';
import { AnyAction } from 'redux';

const initialState: TEmployeeState = {
	users: [],
};

export default function employeeReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case ADMIN_GET_EMPLOYEE: {
			const newUsers: TUser[] = action.payload;

			const filteredUsers = newUsers.filter(
				(user, index, self) => index === self.findIndex((u) => u.id === user.id),
			);

			return { ...state, users: filteredUsers };
		}

		default:
			return { ...state };
	}
}
