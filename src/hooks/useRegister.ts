import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { RegisterData } from '@/types/register';
import { AuthErrorCode, AUTH_ERROR_MESSAGES } from '@/types/auth';

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
				password: data.password,
				role: data.role,
				gender: data.gender,
				age: Number(data.age),
				created_at: new Date().toISOString(),
				user_name: data.userName,
				user_alias: data.userAlias,
				phone_number: data.phoneNumber,
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
