import { AuthFormFields, FormErrors } from './auth';

export interface RegisterData extends AuthFormFields {
	role: string;
	gender: string;
	age: string;
	position: string;
	workingHours: string;
}

export interface FormData extends RegisterData {
	confirmPassword: string;
}

export type RegisterFormErrors = FormErrors<FormData>;

export interface RegisterFormProps {
	onSubmit: (data: FormData) => Promise<void>;
	isSubmitting: boolean;
	submitError: string | null;
}

// 역할 타입과 옵션
export type Role = 'ticket' | 'snack' | 'floor';
export const ROLE_OPTIONS = {
	ticket: { value: 'ticket', label: '매표' },
	snack: { value: 'snack', label: '매점' },
	floor: { value: 'floor', label: '플로어' },
} as const;

// 직책 타입과 옵션
export type Position = 'admin' | 'user';
export const POSITION_OPTIONS = {
	admin: { value: 'admin', label: '관리자' },
	user: { value: 'user', label: '사용자' },
} as const;

// 성별 타입과 옵션
export type Gender = '남성' | '여성';
export const GENDER_OPTIONS = ['남성', '여성'] as const;
