import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { RegisterData } from '@/types/register';
import { AuthErrorCode, AUTH_ERROR_MESSAGES } from '@/types/auth';
import { supabase } from '../../supabaseConfig';

export const useRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const register = async (data: RegisterData) => {
		setIsLoading(true);
		setError(null);

		try {
			// Firebase Authentication에 사용자 생성
			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

			// 공통 사용자 데이터 객체
			const userData = {
				id: userCredential.user.uid, // Firebase UID를 Supabase의 id로 사용
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
				// Firestore에 저장
				await setDoc(doc(db, 'users', userCredential.user.uid), userData);

				// Supabase users 테이블에 저장
				const { error: supabaseError } = await supabase.from('users').insert([userData]);

				if (supabaseError) throw supabaseError;

				return userCredential.user;
			} catch (dbErr) {
				// 에러 발생 시 Firebase Authentication 사용자 삭제
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
