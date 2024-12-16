import {
	SET_MODAL_OPEN,
	SET_CONFIRM_MODAL_OPEN,
	SET_SCHEDULE_ADD_MODAL_OPEN,
	SET_SCHEDULE_EDIT_MODAL_OPEN,
	SET_SCHEDULE_DELETE_MODAL_OPEN,
} from '../actionTypes';

export const setIsModalOpen = (isModalOpen: boolean) => ({
	type: SET_MODAL_OPEN,
	payload: isModalOpen,
});

export const setIsConfirmModalOpen = (isConfirmModalOpen: boolean) => ({
	type: SET_CONFIRM_MODAL_OPEN,
	payload: isConfirmModalOpen,
});

// 일정 관리 페이지 모달들
export const setIsScheduleAddModalOpen = (isScheduleAddModalOpen: boolean) => ({
	type: SET_SCHEDULE_ADD_MODAL_OPEN,
	payload: isScheduleAddModalOpen,
});

export const setIsScheduleEditModalOpen = (isScheduleEditModalOpen: boolean) => ({
	type: SET_SCHEDULE_EDIT_MODAL_OPEN,
	payload: isScheduleEditModalOpen,
});

export const setIsScheduleDeleteModalOpen = (isScheduleDeleteModalOpen: boolean) => ({
	type: SET_SCHEDULE_DELETE_MODAL_OPEN,
	payload: isScheduleDeleteModalOpen,
});
