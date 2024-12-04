import { z } from 'zod';
export type TScheduleCategory = 'ticket' | 'snack' | 'floor';
export type TScheduleShiftType = 'open' | 'middle' | 'close';
export type TScheduleRepeatCycle = 'everyDay' | 'everyWeek' | 'everyMonth';

// ❌ 일단 유지 - supabase로 마이그레이션 완료 후 삭제
import { Timestamp } from 'firebase/firestore';
export type TDate = Date | Timestamp;
//

export interface TSchedule {
	schedule_id: string;
	user_id: string;
	user_name: string;
	user_alias: string;
	category: TScheduleCategory;
	start_date_time: Date;
	time: string;
	end_date_time: Date; // 계산된 종료 시간
	schedule_shift_type: TScheduleShiftType; // 계산된 오픈, 미들, 마감
	repeat?: TScheduleRepeatCycle | null;
	repeat_end_date?: Date | null;
	created_at: Date;
	description?: string | null;
}

export interface TSchedules {
	schedules: TSchedule[];
}

export interface TCalendarState {
	selectedDate: Date;
	filteredSchedules: TSchedule[];
	isLoading: boolean;
	isModalOpen: boolean;
}

export type TScheduleState = TSchedules & TCalendarState;

export interface CalendarComponentProps {
	isManagementPage?: boolean;
}

export interface UserScheduleCardProps {
	schedule: TSchedule;
	shouldShowTime: boolean;
}

// action types
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	SET_MODAL_OPEN,
} from '@/redux/actionTypes';

export interface TGetSchedulesAction {
	type: typeof GET_SCHEDULES;
	payload: TSchedule[];
}

export interface TAddSchedulesAction {
	type: typeof ADD_SCHEDULES;
	payload: TSchedule[];
}

export interface TEditSchedulesAction {
	type: typeof EDIT_SCHEDULES;
	payload: TSchedule[];
}

export interface TRemoveSchedulesAction {
	type: typeof REMOVE_SCHEDULES;
	payload: string[];
}

export interface TSelectDateAction {
	type: typeof SELECT_DATE;
	payload: Date;
}

export interface TFilteredSchedulesAction {
	type: typeof FILTERED_SCHEDULES;
	payload: TSchedule[];
}

export interface TSetLoadingAction {
	type: typeof SET_LOADING;
	payload: boolean;
}

export interface TsetIsModalOpen {
	type: typeof SET_MODAL_OPEN;
	payload: boolean;
}

export type TScheduleActionTypes =
	| TGetSchedulesAction
	| TAddSchedulesAction
	| TEditSchedulesAction
	| TRemoveSchedulesAction
	| TSelectDateAction
	| TFilteredSchedulesAction
	| TSetLoadingAction
	| TsetIsModalOpen;

export interface TScheduleApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}

// 카테코리별 라벨
export const SCHEDULE_CATEGORY_LABELS = {
	ticket: '매표',
	snack: '매점',
	floor: '플로어',
} as const;

// 라디오 버튼 스타일링 관련 타입
export interface RadioInputProps {
	$categoryType: 'ticket' | 'snack' | 'floor';
}
export const categoryColors = {
	ticket: 'var(--color-blue)',
	snack: 'var(--color-caramel)',
	floor: 'var(--color-coral)',
} as const;

// 폼 관련
// select 옵션
export const SCHEDULE_CATEGORY_OPTIONS = {
	ticket: { value: 'ticket', label: '매표' },
	snack: { value: 'snack', label: '매점' },
	floor: { value: 'floor', label: '플로어' },
} as const;

export const SCHEDULE_REPEAT_CYCLE_OPTIONS = {
	everyDay: { value: 'everyDay', label: '매일' },
	everyWeek: { value: 'everyWeek', label: '매주' },
	everyMonth: { value: 'everyMonth', label: '매월' },
} as const;

//폼 인풋
export interface TFormValues {
	user_id?: string; // 관리자에서만
	category: TScheduleCategory;
	start_date_time: Date;
	time: string;
	repeat?: string;
	repeat_end_date?: Date;
	description?: string;
}

// 유효성 검사 관련
const DESCRIPTION_MAX_LENGTH = 30;
const TIME_MAX_LENGTH = 2;
const TIME_MIN_NUMBER = 1;
const TIME_MAX_NUMBER = 10;

export const scheduleSchema = z.object({
	category: z.enum(['ticket', 'snack', 'floor'], {
		errorMap: () => ({ message: '유효한 카테고리를 선택해주세요' }),
	}),
	start_date_time: z.coerce.date(),
	time: z
		.string()
		.max(TIME_MAX_LENGTH, '시간은 최대 2자리로 입력해주세요')
		.refine((val) => Number(val) >= TIME_MIN_NUMBER, {
			message: `근무 시간은 최소 ${TIME_MIN_NUMBER}시간입니다`,
		})
		.refine((val) => Number(val) <= TIME_MAX_NUMBER, {
			message: `근무 시간은 최대 ${TIME_MAX_NUMBER}시간입니다`,
		}),
	description: z
		.string()
		.max(DESCRIPTION_MAX_LENGTH, `업무 설명은 ${DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요`),
	repeat: z
		.enum(['everyDay', 'everyWeek', 'everyMonth'], {
			errorMap: () => ({ message: '유효한 반복주기를 선택해주세요' }),
		})
		.optional(),
	repeat_end_date: z.coerce.date().optional(),
});

export const scheduleAdminSchema = scheduleSchema.pipe(
	z.object({
		user_id: z.string({
			required_error: '유효한 직원 이름이나 닉네임을 입력해주세요',
		}),
	}),
);
