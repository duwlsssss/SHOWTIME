import { FormData, FormErrors, ERROR_MESSAGES, AUTH_VALIDATION } from '@/pages';

// 폼 유효성 검사 함수
export const validateForm = (data: FormData): FormErrors => {
	const errors: FormErrors = {};

	if (!data.email) {
		errors.email = ERROR_MESSAGES.REQUIRED.email;
	} else if (!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = ERROR_MESSAGES.INVALID.email;
	}

	if (!data.password) {
		errors.password = ERROR_MESSAGES.REQUIRED.password;
	} else if (data.password.length < AUTH_VALIDATION.PASSWORD.MIN_LENGTH) {
		errors.password = ERROR_MESSAGES.INVALID.password;
	}

	if (!data.confirmPassword) {
		errors.confirmPassword = ERROR_MESSAGES.REQUIRED.confirmPassword;
	} else if (data.password !== data.confirmPassword) {
		errors.confirmPassword = ERROR_MESSAGES.INVALID.confirmPassword;
	}

	if (!data.role) errors.role = ERROR_MESSAGES.REQUIRED.role;
	if (!data.gender) errors.gender = ERROR_MESSAGES.REQUIRED.gender;
	if (!data.position) errors.position = ERROR_MESSAGES.REQUIRED.position;

	if (!data.age) {
		errors.age = ERROR_MESSAGES.REQUIRED.age;
	} else if (isNaN(Number(data.age)) || Number(data.age) <= 0) {
		errors.age = ERROR_MESSAGES.INVALID.age;
	}

	return errors;
};
