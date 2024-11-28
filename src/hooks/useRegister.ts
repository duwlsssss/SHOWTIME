import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';

export interface RegisterData {
	email: string;
	password: string;
	role: string;
	gender: string;
	age: string;
	position: string;
	workingHours: string;
}

// Firebase Auth에서 반환되는 에러 코드
type AuthErrorCode =
	| 'auth/email-already-in-use'
	| 'auth/invalid-email'
	| 'auth/weak-password'
	| 'permission-denied'
	| 'unavailable'
	| 'default';

// 에러 메시지 맵핑
// Record는 키와 값의 쌍으로 이루어진 객체를 생성하는 유틸리티 타입
const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
	'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
	'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
	'auth/weak-password': '비밀번호는 6글자 이상이어야 합니다.',
	'permission-denied': '데이터 저장 권한이 없습니다.',
	unavailable: '서비스에 연결할 수 없습니다.',
	default: '회원가입 중 오류가 발생했습니다.',
} as const;

export const useRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const register = async (data: RegisterData) => {
		setIsLoading(true);
		setError(null);

		try {
			// Firebase Authentication에 사용자 생성
			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

			// Firestore에 추가 사용자 정보 저장
			const userData = {
				email: data.email,
				role: data.role,
				gender: data.gender,
				age: Number(data.age),
				position: data.position,
				createdAt: new Date().toISOString(),
			};

			try {
				await setDoc(doc(db, 'users', userCredential.user.uid), userData);
				return userCredential.user;
			} catch (dbErr) {
				// Firestore 에러 발생 시 Authentication에서 생성된 사용자도 삭제
				await userCredential.user.delete();
				throw dbErr;
			}
		} catch (err: unknown) {
			let errorCode = 'default' as AuthErrorCode;

			if (err && typeof err === 'object' && 'code' in err) {
				const code = (err as { code: string }).code;
				errorCode = code as AuthErrorCode;
			}

			const errorMessage = AUTH_ERROR_MESSAGES[errorCode];
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { register, isLoading, error };
};
