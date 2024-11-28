import {
	doc,
	setDoc,
	collection,
	getDocs,
	updateDoc,
	deleteDoc,
	getDoc,
	Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { ThunkAction } from 'redux-thunk';
import { TSchedule, TScheduleState } from '@/types/schedule';
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
} from '../actionTypes';

const getSchedules = (schedules: TSchedule[]) => ({
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

export const selectDate = (date: Date | null) => ({
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
// 응답 타입 정의
export interface FirestoreResponse<T = void> {
	success?: boolean;
	message?: string;
	data?: T;
}

type ScheduleActionTypes =
	| ReturnType<typeof getSchedules>
	| ReturnType<typeof addSchedules>
	| ReturnType<typeof editSchedules>
	| ReturnType<typeof removeSchedules>;

type ThunkResult<R> = ThunkAction<
	Promise<R>,
	{ schedule: TScheduleState },
	undefined,
	ScheduleActionTypes
>;

// firestore에서 스케줄 가져오기
export const fetchSchedulesFromFirestore = (
	userId: string,
): ThunkResult<FirestoreResponse<TSchedule[]>> => {
	return async (dispatch) => {
		try {
			const schedulesCollectionRef = collection(db, 'schedules', userId, 'userSchedules');
			const querySnapshot = await getDocs(schedulesCollectionRef);

			const schedules: TSchedule[] = [];
			querySnapshot.forEach((doc) => {
				schedules.push(doc.data() as TSchedule);
			});

			dispatch(getSchedules(schedules));

			return {
				success: true,
				message: '일정을 성공적으로 조회했습니다.',
				data: schedules,
			};
		} catch (error) {
			console.error('Firestore 일정 조회 실패', error);
			return {
				success: false,
				message: '일정 조회 중 오류가 발생했습니다.',
			};
		}
	};
};

// firestore에 스케줄 추가
export const addScheduleToFirestore = (
	userId: string,
	schedules: TSchedule[],
): ThunkResult<FirestoreResponse<void>> => {
	return async (dispatch) => {
		try {
			const schedulesCollectionRef = collection(db, 'schedules', userId, 'userSchedules');
			for (const schedule of schedules) {
				const scheduleDocRef = doc(schedulesCollectionRef, schedule.schedule_id); // schedule_id로 문서 생성
				// Firestore에서 schedule_id 확인
				const scheduleSnapshot = await getDoc(scheduleDocRef);
				if (!scheduleSnapshot.exists()) {
					const newSchedule = {
						...schedule,
						created_at: Timestamp.now(), // 현재 시간을 Firestore Timestamp로 저장
					};

					await setDoc(scheduleDocRef, newSchedule);
					dispatch(addSchedules([newSchedule]));
				} else {
					console.log(`${schedule.schedule_id} 가 이미 존재함`);
				}
			}
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
		}
	};
};

// firestore에 스케줄 수정
export const editScheduleToFirestore = (
	userId: string,
	schedules: TSchedule[],
): ThunkResult<FirestoreResponse<void>> => {
	return async (dispatch) => {
		try {
			for (const schedule of schedules) {
				// userSchedules 컬렉션의 문서 참조
				const scheduleDocRef = doc(db, 'schedules', userId, 'userSchedules', schedule.schedule_id);
				await updateDoc(scheduleDocRef, { ...schedule });
			}

			// Redux 상태 업데이트
			dispatch(editSchedules(schedules));

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
		}
	};
};

// firestore에 스케줄 삭제
export const removeScheduleToFirestore = (
	userId: string,
	scheduleIds: string[],
): ThunkResult<FirestoreResponse<void>> => {
	return async (dispatch) => {
		try {
			for (const scheduleId of scheduleIds) {
				// userSchedules 컬렉션의 문서 참조
				const scheduleDocRef = doc(db, 'schedules', userId, 'userSchedules', scheduleId);
				await deleteDoc(scheduleDocRef);
			}

			// Redux 상태 업데이트
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
		}
	};
};
