import { db } from '@/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// 사용자 등록 데이터 인터페이스
interface UserRegistrationData {
	userId: string;
	password: string;
	createdAt: Date;
}

// 등록 결과 인터페이스
interface RegistrationResult {
	success: boolean;
	error?: string;
}

export function useFirestoreUserRegistration() {
	const registerWithUserId = async (
		userId: string,
		password: string,
	): Promise<RegistrationResult> => {
		try {
			// 중복 체크
			const userDocRef = doc(db, 'users', userId);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				return {
					success: false,
					error: 'User ID already exists',
				};
			}

			// 새 사용자 데이터 생성
			const userData: UserRegistrationData = {
				userId,
				password,
				createdAt: new Date(),
			};

			// Firestore에 저장
			await setDoc(userDocRef, userData);

			return { success: true };
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Registration failed';
			return {
				success: false,
				error: errorMessage,
			};
		}
	};

	return { registerWithUserId };
}
