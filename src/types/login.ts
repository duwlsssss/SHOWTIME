import { User } from 'firebase/auth';

export type LoginFormData = {
	email: string;
	password: string;
};

export type LoginFormErrors = {
	[K in keyof LoginFormData]?: string;
};

export type LoginAuthErrorCode =
	| 'auth/invalid-email'
	| 'auth/user-disabled'
	| 'auth/user-not-found'
	| 'auth/wrong-password'
	| 'auth/too-many-requests'
	| 'default';

export interface LoginProps {
	user: User | null;
	isLoading: boolean;
	errors: LoginFormErrors;
}

export const ERROR_MESSAGES = {
	REQUIRED: {
		email: '이메일을 입력해주세요',
		password: '비밀번호를 입력해주세요',
	},
	INVALID: {
		email: '올바른 이메일 형식이 아닙니다',
	},
} as const;

export const AUTH_ERROR_MESSAGES: Record<LoginAuthErrorCode, string> = {
	'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
	'auth/user-disabled': '비활성화된 계정입니다.',
	'auth/user-not-found': '등록되지 않은 이메일입니다.',
	'auth/wrong-password': '잘못된 비밀번호입니다.',
	'auth/too-many-requests': '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
	default: '로그인 중 오류가 발생했습니다.',
} as const;
