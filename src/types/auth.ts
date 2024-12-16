export type { User } from 'firebase/auth';

// 전역 유저 정보
export interface TUser {
	id: string;
	email: string | null;
	userName: string;
	userAlias: string;
	age: number;
	role: string;
	gender: string;
	created_at: string;
	phoneNumber?: string;
}
export interface AuthState {
	user: TUser | null;
	isAuthInitialized: boolean;
}

// 공통 필드 타입
export interface AuthFormFields {
	email: string;
	password: string;
}

// 공통 에러 타입
export type FormErrors<T> = {
	[K in keyof T]?: string;
};

// 공통 인증 에러 코드
export type AuthErrorCode =
	| 'auth/email-already-in-use'
	| 'auth/invalid-email'
	| 'auth/weak-password'
	| 'auth/user-disabled'
	| 'auth/user-not-found'
	| 'auth/wrong-password'
	| 'auth/too-many-requests'
	| 'permission-denied'
	| 'unavailable'
	| 'default';

// 공통 인증 에러 메시지
export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
	'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
	'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
	'auth/weak-password': '비밀번호는 6글자 이상이어야 합니다.',
	'auth/user-disabled': '비활성화된 계정입니다.',
	'auth/user-not-found': '등록되지 않은 이메일입니다.',
	'auth/wrong-password': '잘못된 비밀번호입니다.',
	'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
	'permission-denied': '데이터 저장 권한이 없습니다.',
	unavailable: '서비스에 연결할 수 없습니다.',
	default: '인증 중 오류가 발생했습니다.',
} as const;

// 비밀번호 유효성 검사 규칙
export const AUTH_VALIDATION = {
	PASSWORD: {
		MIN_LENGTH: 6,
	},
} as const;

// 공통 에러 메시지
export const COMMON_ERROR_MESSAGES = {
	REQUIRED: {
		email: '이메일을 입력해주세요',
		password: '비밀번호를 입력해주세요',
		confirmPassword: '비밀번호 확인을 입력해주세요',
		role: '역할을 선택해주세요',
		gender: '성별을 선택해주세요',
		age: '나이를 입력해주세요',
		position: '직책을 선택해주세요',
		shiftType: '시간 타입을 선택해주세요',
		userName: '이름을 입력해주세요',
		userAlias: '별명을 입력해주세요',
		phoneNumber: '전화번호를 입력해주세요',
	},
	INVALID: {
		email: '올바른 이메일 형식이 아닙니다',
		password: `비밀번호는 ${AUTH_VALIDATION.PASSWORD.MIN_LENGTH}자 이상이어야 합니다`,
		confirmPassword: '비밀번호가 일치하지 않습니다',
		age: '올바른 나이를 입력해주세요',
		phoneNumber: '올바른 전화번호 형식이 아닙니다 (01012345678)',
	},
} as const;

interface FirebaseUser {
	uid: string;
	email: string | null;
}

interface UserData {
	user_name?: string;
	user_alias?: string;
	age?: number;
	role?: string;
	gender?: string;
	created_at?: string;
	phone_number?: string;
}

export const formatUserData = (currentUser: FirebaseUser, additionalData?: UserData): TUser => {
	return {
		id: currentUser.uid,
		email: currentUser.email,
		userName: additionalData?.user_name ?? '',
		userAlias: additionalData?.user_alias ?? '',
		age: additionalData?.age ?? 0,
		role: additionalData?.role ?? '',
		gender: additionalData?.gender ?? '',
		created_at: additionalData?.created_at ?? '',
		phoneNumber: additionalData?.phone_number,
	};
};
