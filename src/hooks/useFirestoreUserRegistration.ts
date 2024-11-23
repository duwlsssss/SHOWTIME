import { useState } from 'react';
import { db } from '@/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export function useFirestoreUserRegistration() {
	const [error, setError] = useState<string | null>(null);

	const registerWithUserId = async (userId: string, password: string) => {
		try {
			// 중복 체크
			const userDocRef = doc(db, 'users', userId);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				console.error('User ID already exists');
				setError('User ID already exists');
				return false;
			}

			// 새 사용자 등록
			await setDoc(userDocRef, {
				userId,
				password,
				createdAt: new Date(),
			});

			console.log('Registration successful!');
			setError(null);
			return true;
		} catch (error) {
			setError('Registration failed');
			console.error(error);
			return false;
		}
	};

	return { error, registerWithUserId };
}
