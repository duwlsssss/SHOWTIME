import { ADMIN_GET_EMPLOYEE } from '../actionTypes';
import { TSchedule } from '@/types/schedule';
import { AnyAction } from 'redux';

const initialState = {
	schedules: [],
};

export default function employeeReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case ADMIN_GET_EMPLOYEE: {
			const newSchedules: TSchedule[] = action.payload;

			const updatedSchedules = newSchedules.filter(
				(schedule, index, self) => index === self.findIndex((s) => s.user_id === schedule.user_id),
			); // ✅ 회원가입 로직 수정 후(같은 이름, 별명 못 입력) 중복 검사 삭제 필요 -

			return { ...state, schedules: updatedSchedules };
		}

		default:
			return { ...state };
	}
}
