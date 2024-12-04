import { TUser } from '@/types/auth';

import { SET_USER, CLEAR_USER } from '../actionTypes';

export const setUser = (userData: TUser | null) => ({
	type: SET_USER,
	payload: userData,
});

export const clearUser = () => ({
	type: CLEAR_USER,
});
