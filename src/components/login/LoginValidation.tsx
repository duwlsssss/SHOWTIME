//import { FirebaseError } from 'firebase/app';
import {
	// AuthErrorCode,
	// AUTH_ERROR_MESSAGES,
	COMMON_ERROR_MESSAGES,
	AUTH_VALIDATION,
} from '@/types/auth';
import { LoginFormData, LoginFormErrors } from '@/types/login';

// 유효성 검사 규칙
const VALIDATION_RULES = {
	email: {
		required: (value: string) => !!value,
		format: (value: string) => /\S+@\S+\.\S+/.test(value),
	},
	password: {
		required: (value: string) => !!value,
		minLength: (value: string) => value.length >= AUTH_VALIDATION.PASSWORD.MIN_LENGTH,
	},
} as const;

export const validateLoginForm = (data: LoginFormData): LoginFormErrors => {
	const errors: LoginFormErrors = {};

	if (!VALIDATION_RULES.email.required(data.email)) {
		errors.email = COMMON_ERROR_MESSAGES.REQUIRED.email;
	} else if (!VALIDATION_RULES.email.format(data.email)) {
		errors.email = COMMON_ERROR_MESSAGES.INVALID.email;
	}

	if (!VALIDATION_RULES.password.required(data.password)) {
		errors.password = COMMON_ERROR_MESSAGES.REQUIRED.password;
	} else if (!VALIDATION_RULES.password.minLength(data.password)) {
		errors.password = COMMON_ERROR_MESSAGES.INVALID.password;
	}

	return errors;
};

export const getAuthErrorMessage = (): string => {
	// let errorCode = 'default' as AuthErrorCode;
	// if (error instanceof FirebaseError) {
	// 	errorCode = error.code as AuthErrorCode;
	// }
	// return AUTH_ERROR_MESSAGES[errorCode];
	return '이메일 또는 비밀번호를 확인해주세요';
};
