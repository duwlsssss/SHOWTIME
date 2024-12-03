import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { AppThunk } from '@/redux/store';
import { TScheduleApiResponse, TSchedule } from '@/types/schedule';
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	SET_SCHEDULE_MODAL_OPEN,
} from '../actionTypes';

export const setisLoading = (isLoading: boolean) => ({
	type: SET_LOADING,
	payload: isLoading,
});

//스케줄 추가, 수정 모달 상태
export const setIsScheduleModalOpen = (isScheduleModalOpen: boolean) => ({
	type: SET_SCHEDULE_MODAL_OPEN,
	payload: isScheduleModalOpen,
});

export const getSchedules = (schedules: TSchedule[]) => ({
	type: GET_SCHEDULES,
	payload: schedules,
});

const addSchedules = (schedules: TSchedule[]) => ({
	type: ADD_SCHEDULES,
	payload: schedules,
});

const editSchedules = (schedules: TSchedule[]) => ({
	type: EDIT_SCHEDULES,
	payload: schedules,
});

const removeSchedules = (scheduleIds: string[]) => ({
	type: REMOVE_SCHEDULES,
	payload: scheduleIds,
});

export const selectDate = (date: Date | Timestamp) => ({
	type: SELECT_DATE,
	payload: date,
});

export const filteredSchedules = (schedules: TSchedule[]) => ({
	type: FILTERED_SCHEDULES,
	payload: schedules,
});

/**
 * schedules (컬렉션)
 * └─ userId (문서)
 *      └─ userSchedules (하위 컬렉션)
 *          ├─ schedule_id_1 (문서)
 *          ├─ schedule_id_2 (문서)
 */
// Firestore에 스케줄 추가
export const addScheduleToFirestore = (
	userId: string | undefined,
	schedules: TSchedule[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch) => {
		if (!userId) {
			return {
				success: false,
				message: '사용자 ID가 없습니다.',
			};
		}

		dispatch(setisLoading(true));
		try {
			const userDocRef = doc(db, 'schedules', userId);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				// 사용자 문서가 없으면 새로 생성
				await setDoc(userDocRef, {
					schedules: schedules.map((schedule) => ({
						...schedule,
						created_at: Timestamp.now(),
					})),
				});
			} else {
				// 기존 스케줄 배열에 새 스케줄 추가
				const existingSchedules = userDoc.data().schedules || [];
				const updatedSchedules = [
					...existingSchedules,
					...schedules.map((schedule) => ({
						...schedule,
						created_at: Timestamp.now(),
					})),
				];

				await updateDoc(userDocRef, { schedules: updatedSchedules });
			}

			dispatch(addSchedules(schedules));
			return {
				success: true,
				message: '일정을 성공적으로 추가했습니다.',
			};
		} catch (error) {
			console.error('firestore에 스케줄 추가 실패', error);
			return {
				success: false,
				message: '일정 추가 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false));
		}
	};
};

// Firestore에서 스케줄 수정
export const editScheduleToFirestore = (
	userId: string | undefined,
	updatedSchedules: TSchedule[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch) => {
		if (!userId) {
			return {
				success: false,
				message: '사용자 ID가 없습니다.',
			};
		}

		dispatch(setisLoading(true));
		try {
			const userDocRef = doc(db, 'schedules', userId);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				throw new Error('사용자 문서가 존재하지 않습니다.');
			}

			const existingSchedules: TSchedule[] = userDoc.data().schedules || [];
			const updatedSchedulesList = existingSchedules.map((schedule) => {
				const updatedSchedule = updatedSchedules.find(
					(s) => s.schedule_id === schedule.schedule_id,
				);
				return updatedSchedule || schedule;
			});

			await updateDoc(userDocRef, { schedules: updatedSchedulesList });
			dispatch(editSchedules(updatedSchedules));

			return {
				success: true,
				message: '일정을 성공적으로 수정했습니다.',
			};
		} catch (error) {
			console.error('firestore에 스케줄 수정 실패', error);
			return {
				success: false,
				message: '일정 수정 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false));
		}
	};
};

// Firestore에서 스케줄 삭제
export const removeScheduleToFirestore = (
	userId: string | undefined,
	scheduleIds: string[],
): AppThunk<Promise<TScheduleApiResponse<void>>> => {
	return async (dispatch) => {
		if (!userId) {
			return {
				success: false,
				message: '사용자 ID가 없습니다.',
			};
		}

		dispatch(setisLoading(true));
		try {
			const userDocRef = doc(db, 'schedules', userId);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				throw new Error('사용자 문서가 존재하지 않습니다.');
			}

			const existingSchedules: TSchedule[] = userDoc.data().schedules || [];

			const filteredSchedules = existingSchedules.filter(
				(schedule) => !scheduleIds.includes(schedule.schedule_id),
			);

			await updateDoc(userDocRef, { schedules: filteredSchedules });
			dispatch(removeSchedules(scheduleIds));

			return {
				success: true,
				message: '일정을 성공적으로 삭제했습니다.',
			};
		} catch (error) {
			console.error('firestore에 스케줄 삭제 실패', error);
			return {
				success: false,
				message: '일정 삭제 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false));
		}
	};
};
