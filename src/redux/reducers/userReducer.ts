import { AuthState } from '@/types/auth';

import { SET_USER, CLEAR_USER } from '../actionTypes';

const initialState: AuthState = {
	user: null,
	isAuthInitialized: false,
};

export default function userReducer(state: AuthState = initialState, action: any): AuthState {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload, isAuthInitialized: true };
		case CLEAR_USER:
			return { ...state, user: null, isAuthInitialized: true }; //로그아웃해도 인증 초기화는 완료된 상태
		default:
			return state;
	}
}
