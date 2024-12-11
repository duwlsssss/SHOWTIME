import { FormData } from '@/types/register';
import { FormErrors, COMMON_ERROR_MESSAGES, AUTH_VALIDATION } from '@/types/auth';

const VALIDATION_RULES = {
	phoneNumber: {
		required: (value: string) => !!value,
		format: (value: string) => /^010\d{8}$/.test(value),
	},
};

export const validateForm = (data: FormData): FormErrors<FormData> => {
	const errors: FormErrors<FormData> = {};

	if (!data.email) {
		errors.email = COMMON_ERROR_MESSAGES.REQUIRED.email;
	} else if (!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = COMMON_ERROR_MESSAGES.INVALID.email;
	}

	if (!data.password) {
		errors.password = COMMON_ERROR_MESSAGES.REQUIRED.password;
	} else if (data.password.length < AUTH_VALIDATION.PASSWORD.MIN_LENGTH) {
		errors.password = COMMON_ERROR_MESSAGES.INVALID.password;
	}

	if (!data.confirmPassword) {
		errors.confirmPassword = COMMON_ERROR_MESSAGES.REQUIRED.confirmPassword;
	} else if (data.password !== data.confirmPassword) {
		errors.confirmPassword = COMMON_ERROR_MESSAGES.INVALID.confirmPassword;
	}

	if (!data.role) errors.role = COMMON_ERROR_MESSAGES.REQUIRED.role;
	if (!data.gender) errors.gender = COMMON_ERROR_MESSAGES.REQUIRED.gender;
	if (!data.userName) errors.userName = COMMON_ERROR_MESSAGES.REQUIRED.userName;
	if (!data.userAlias) errors.userAlias = COMMON_ERROR_MESSAGES.REQUIRED.userAlias;

	if (!data.age) {
		errors.age = COMMON_ERROR_MESSAGES.REQUIRED.age;
	} else if (isNaN(Number(data.age)) || Number(data.age) <= 0) {
		errors.age = COMMON_ERROR_MESSAGES.INVALID.age;
	}

	if (!VALIDATION_RULES.phoneNumber.required(data.phoneNumber)) {
		errors.phoneNumber = COMMON_ERROR_MESSAGES.REQUIRED.phoneNumber;
	} else if (!VALIDATION_RULES.phoneNumber.format(data.phoneNumber)) {
		errors.phoneNumber = COMMON_ERROR_MESSAGES.INVALID.phoneNumber;
	}

	return errors;
};
