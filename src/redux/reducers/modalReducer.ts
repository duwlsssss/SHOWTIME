import {
	SET_MODAL_OPEN,
	SET_CONFIRM_MODAL_OPEN,
	SET_SCHEDULE_ADD_MODAL_OPEN,
	SET_SCHEDULE_EDIT_MODAL_OPEN,
	SET_SCHEDULE_DELETE_MODAL_OPEN,
} from '../actionTypes';
import { AnyAction } from 'redux';
import { TModalState } from '@/types/modal';

const initialState: TModalState = {
	isModalOpen: false,
	isConfirmModalOpen: false,
	isScheduleAddModalOpen: false,
	isScheduleEditModalOpen: false,
	isScheduleDeleteModalOpen: false,
};

export default function ModalReducer(
	state: TModalState = initialState,
	action: AnyAction,
): TModalState {
	switch (action.type) {
		case SET_MODAL_OPEN:
			return { ...state, isModalOpen: action.payload };
		case SET_CONFIRM_MODAL_OPEN:
			return { ...state, isConfirmModalOpen: action.payload };
		case SET_SCHEDULE_ADD_MODAL_OPEN:
			return { ...state, isScheduleAddModalOpen: action.payload };
		case SET_SCHEDULE_EDIT_MODAL_OPEN:
			return { ...state, isScheduleEditModalOpen: action.payload };
		case SET_SCHEDULE_DELETE_MODAL_OPEN:
			return { ...state, isScheduleDeleteModalOpen: action.payload };
		default:
			return state;
	}
}
