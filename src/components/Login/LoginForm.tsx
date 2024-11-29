import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import * as S from '@/pages/Login/Login.styles';
import { auth } from '@/firebaseConfig';
import { LoginFormData, LoginFormErrors } from '@/types/login';
import { User } from '@/types/auth';
import { validateLoginForm, getAuthErrorMessage } from '@/components/Login/LoginValidation';
import { Loading } from '@/pages';

export function LoginForm() {
	const [user, setUser] = useState<User | null>(null);
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<LoginFormErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthInitialized, setIsAuthInitialized] = useState(false);

	// 파이어베이스 auth 상태 변경 감지 -> 로그인 상태 확인
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setIsAuthInitialized(true);
		});

		return () => unsubscribe();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name as keyof LoginFormData]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const handleLogout = async () => {
		try {
			// 파이어베이스 auth 함수
			await signOut(auth);
			setFormData({ email: '', password: '' });
		} catch (error) {
			console.error('로그아웃 에러:', error);
		}
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateLoginForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);

		try {
			await signInWithEmailAndPassword(auth, formData.email, formData.password);
		} catch (error) {
			const errorMessage = getAuthErrorMessage(error);
			setErrors({ password: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	if (!isAuthInitialized) {
		return <Loading />;
	}

	return (
		<S.LoginContainer>
			<S.LeftSection>
				<img src="/assets/images/login_popcorn.svg" alt="팝콘 일러스트레이션" />
			</S.LeftSection>
			<S.RightSection>
				<S.FormContainer>
					{user ? (
						<>
							<S.FormTitle>환영합니다</S.FormTitle>
							<p>{user.email}</p>
							<p>uid: {user.uid}</p>
							<S.SubmitButton onClick={handleLogout}>로그아웃</S.SubmitButton>
						</>
					) : (
						<>
							<S.FormTitle>로그인</S.FormTitle>
							<form onSubmit={handleLogin}>
								<S.FormField>
									<S.Label htmlFor="email">이메일</S.Label>
									<S.Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										hasError={!!errors.email}
									/>
									{errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
								</S.FormField>

								<S.FormField>
									<S.Label htmlFor="password">비밀번호</S.Label>
									<S.Input
										id="password"
										name="password"
										type="password"
										value={formData.password}
										onChange={handleInputChange}
										hasError={!!errors.password}
									/>
									{errors.password && <S.ErrorMessage>{errors.password}</S.ErrorMessage>}
								</S.FormField>

								<S.SubmitButton type="submit" disabled={isLoading}>
									{isLoading ? '로그인 중...' : '로그인'}
								</S.SubmitButton>
							</form>
						</>
					)}
				</S.FormContainer>
			</S.RightSection>
		</S.LoginContainer>
	);
}
