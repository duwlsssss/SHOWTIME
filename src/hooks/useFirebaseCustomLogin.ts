import { useState } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
	userId: string;
	email?: string;
	displayName?: string;
	// 필요한 다른 사용자 데이터 필드 추가
}

interface ErrorResponse {
	code: string;
	message: string;
}

export function useCustomLogin() {
	const [user, setUser] = useState<UserData | null>(null);
	const [error, setError] = useState<ErrorResponse | null>(null);

	const loginWithUserId = async (userId: string, password: string) => {
		try {
			const userDoc = await getDoc(doc(db, 'users', userId));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				if (userData.password === password) {
					setUser({ userId });
					console.log('Login successful!');
				} else {
					console.error('Invalid password');
				}
			} else {
				console.error('User not found');
			}
			setError(null);
		} catch (error: unknown) {
			const errorResponse = error as ErrorResponse;
			setError(errorResponse);
		}
	};

	const logout = () => {
		setUser(null);
		console.log('Logged out');
	};

	return { user, error, loginWithUserId, logout };
}
