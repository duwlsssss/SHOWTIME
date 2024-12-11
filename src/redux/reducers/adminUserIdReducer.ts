import { ADMIN_USER_SEARCH_ID } from '../actionTypes';
import { AnyAction } from 'redux';

// 초기 상태를 명시적으로 설정
const initialState: string | null = null;

export default function adminUserIdReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case ADMIN_USER_SEARCH_ID: {
			return action.payload; // adminUserId 값을 업데이트
		}
		default:
			return state; // 초기 상태 또는 현재 상태를 반환
	}
}
