import { AuthFormFields, FormErrors } from './auth';

export interface RegisterData extends AuthFormFields {
	age: string;
	userName: string;
	userAlias: string;
	role: (typeof ROLE_OPTIONS)[keyof typeof ROLE_OPTIONS]['value'] | '';
	gender: (typeof GENDER_OPTIONS)[keyof typeof GENDER_OPTIONS]['value'] | '';
	phoneNumber: string;
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

// 상수 타입으로 선언(런타임 시 타입 체크)하고 typeof로 컴파일시 타입을 체크함
// 직책 타입과 옵션
export const ROLE_OPTIONS = {
	admin: { value: 'admin', label: '관리자' },
	user: { value: 'user', label: '사용자' },
} as const;

// 성별 타입과 옵션
export const GENDER_OPTIONS = {
	male: { value: 'man', label: '남성' },
	female: { value: 'woman', label: '여성' },
} as const;
