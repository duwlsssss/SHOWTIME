import { db } from '@/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useState } from 'react';

interface UserRegistrationData {
	userId: string;
	email: string;
	displayName?: string;
	// 필요한 다른 등록 데이터 필드 추가
}

interface ErrorResponse {
	code: string;
	message: string;
}

export function useFirestoreUserRegistration() {
	const [error, setError] = useState<ErrorResponse | null>(null);

	const registerUser = async (userData: UserRegistrationData) => {
		try {
			const userDocRef = doc(db, 'users', userData.userId);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				console.error('User ID already exists');
				setError({ code: 'user_id_exists', message: 'User ID already exists' });
				return; // 중복된 userId가 있을 경우 아무것도 반환하지 않음
			}

			await setDoc(userDocRef, userData);
			console.log('User registered successfully with ID:', userData.userId);
			setError(null);
		} catch (error: unknown) {
			const errorResponse = error as ErrorResponse;
			setError(errorResponse);
		}
	};

	return { error, registerUser };
}
