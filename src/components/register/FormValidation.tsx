// 인증 유효성 검사 규칙
export const AUTH_VALIDATION = {
	PASSWORD: {
		MIN_LENGTH: 6,
	},
} as const;

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

// FormData 타입 정의
export type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
	role: Role | '';
	gender: Gender | '';
	age: string;
	position: Position | '';
	workingHours: string;
};

// FormErrors 타입 정의
export type FormErrors = {
	[K in keyof FormData]?: string;
};

// 에러 메시지 상수
export const ERROR_MESSAGES = {
	REQUIRED: {
		email: '이메일을 입력해주세요',
		password: '비밀번호를 입력해주세요',
		confirmPassword: '비밀번호 확인을 입력해주세요',
		role: '역할을 선택해주세요',
		gender: '성별을 선택해주세요',
		age: '나이를 입력해주세요',
		position: '직책을 입력해주세요',
	},
	INVALID: {
		email: '올바른 이메일 형식이 아닙니다',
		password: `비밀번호는 ${AUTH_VALIDATION.PASSWORD.MIN_LENGTH}자 이상이어야 합니다`,
		confirmPassword: '비밀번호가 일치하지 않습니다',
		age: '올바른 나이를 입력해주세요',
	},
} as const;

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
