import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import * as S from './Login.styles';

const auth = getAuth();
const db = getFirestore();

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState<User | null>(auth.currentUser);
	const [error, setError] = useState<string | null>(null);
	const [profileImage, setProfileImage] = useState<string>('');

	const fetchUserProfileImage = async (userId: string) => {
		try {
			const userDocRef = doc(db, 'users', userId);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data();
				setProfileImage(userData.profileImage);
			}
		} catch (error) {
			console.error('프로필 이미지 로드 실패:', error);
		}
	};

	const handleUserLogin = async () => {
		if (!email || !password) {
			setError('이메일과 비밀번호를 모두 입력해주세요');
			return;
		}

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			await fetchUserProfileImage(userCredential.user.uid);
			setError(null);
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
			setError('로그인 실패: ' + errorMessage);
		}
	};

	const handleUserLogout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			setProfileImage('');
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
			setError('로그아웃 실패: ' + errorMessage);
		}
	};

	return (
		<S.LoginContainer>
			<h2>Login</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{user ? (
				<div>
					<img
						src={profileImage}
						alt="프로필 이미지"
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '50%',
							border: '2px solid #ddd',
							marginBottom: '10px',
						}}
					/>
					<p>환영합니다, {user.email}</p>
					<button onClick={handleUserLogout}>로그아웃</button>
				</div>
			) : (
				<div>
					<input
						type="email"
						placeholder="이메일 입력"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="비밀번호 입력"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleUserLogin}>로그인</button>
				</div>
			)}
		</S.LoginContainer>
	);
}
