import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import * as S from './Register.styles';

const auth = getAuth();
const db = getFirestore();

const DEFAULT_PROFILE_IMAGE = '../../../public/assets/images/default-profile.png';

export function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleRegister = async () => {
		// 기본 유효성 검사
		if (!email || !password) {
			setError('Please fill in all fields');
			return;
		}

		try {
			// Firebase Auth로 이메일/비밀번호로 사용자 생성
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const { user } = userCredential;

			// Firestore에 사용자 추가 데이터 저장
			await setDoc(doc(db, 'users', user.uid), {
				email: user.email,
				createdAt: new Date().toISOString(),
				role: 'user', // 기본 역할
				profileImage: DEFAULT_PROFILE_IMAGE,
			});

			console.log('회원가입 성공, 로그인 페이지로 이동 시도...');
			navigate('/login', { replace: true });
			console.log('네비게이션 완료');
		} catch (error: unknown) {
			// 에러 메시지 처리
			console.error('회원가입 오류:', error);
		}
	};

	return (
		<S.RegisterContainer>
			<h2>Register</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<input
				type="email"
				placeholder="Enter Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleRegister}>Register</button>
		</S.RegisterContainer>
	);
}
