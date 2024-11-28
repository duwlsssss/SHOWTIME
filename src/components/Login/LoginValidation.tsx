import { FirebaseError } from 'firebase/app';
import {
	LoginFormData,
	LoginFormErrors,
	LoginAuthErrorCode,
	ERROR_MESSAGES,
	AUTH_ERROR_MESSAGES,
} from '@/types/login';

// 유효성 검사 규칙
const VALIDATION_RULES = {
	email: {
		required: (value: string) => !!value,
		format: (value: string) => /\S+@\S+\.\S+/.test(value),
	},
	password: {
		required: (value: string) => !!value,
	},
} as const;

export const validateLoginForm = (data: LoginFormData): LoginFormErrors => {
	const errors: LoginFormErrors = {};

	if (!VALIDATION_RULES.email.required(data.email)) {
		errors.email = ERROR_MESSAGES.REQUIRED.email;
	} else if (!VALIDATION_RULES.email.format(data.email)) {
		errors.email = ERROR_MESSAGES.INVALID.email;
	}

	if (!VALIDATION_RULES.password.required(data.password)) {
		errors.password = ERROR_MESSAGES.REQUIRED.password;
	}

	return errors;
};

export const getAuthErrorMessage = (error: unknown): string => {
	let errorCode = 'default' as LoginAuthErrorCode;

	if (error instanceof FirebaseError) {
		errorCode = error.code as LoginAuthErrorCode;
	}

	return AUTH_ERROR_MESSAGES[errorCode];
};
