import { z } from 'zod';
export type TScheduleCategory = 'ticket' | 'snack' | 'floor' | '';
export type TScheduleShiftType = 'open' | 'middle' | 'close';
export type TScheduleRepeatCycle = 'everyDay' | 'everyWeek' | 'everyMonth';

export type TDate = Date | string; // supabase에 ISOstring으로 저장됨

export interface TSchedule {
	schedule_id: string;
	user_id?: string;
	user_name: string;
	user_alias: string;
	category: TScheduleCategory;
	start_date_time: TDate;
	time: string;
	end_date_time: TDate; // 계산된 종료 시간
	schedule_shift_type: TScheduleShiftType; // 계산된 오픈, 미들, 마감
	repeat?: TScheduleRepeatCycle;
	repeat_end_date?: TDate;
	created_at: TDate;
	description?: string;
}

export interface TSchedules {
	schedules: TSchedule[];
}

export interface TCalendarState {
	selectedDate: Date;
	filteredSchedules: TSchedule[];
	isLoading: boolean;
	selectedSchedule: TSchedule | null;
}

export type TScheduleState = TSchedules & TCalendarState;

export interface CalendarComponentProps {
	isManagementPage?: boolean;
}

export interface UserScheduleCardProps {
	schedule: TSchedule;
	shouldShowTime: boolean;
}

export interface TScheduleModalProps {
	type: 'scheduleUser' | 'scheduleAdmin';
	mode: 'add' | 'edit';
	adminUserId?: string;
}

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
	start_date_time: TDate;
	time: string;
	repeat?: string;
	repeat_end_date?: TDate;
	description?: string;
}

// 유효성 검사 관련
const DESCRIPTION_MAX_LENGTH = 30;
const TIME_MAX_LENGTH = 2;
const TIME_MIN_NUMBER = 1;
const TIME_MAX_NUMBER = 10;

export const scheduleSchema = z.object({
	category: z.string().min(1, { message: '카테고리를 선택해주세요' }),
	start_date_time: z.coerce.date(),
	time: z
		.string()
		.min(1, { message: '근무 시간을 입력해주세요' })
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
	repeat: z.string().optional(),
	repeat_end_date: z.coerce.date().optional(),
});
