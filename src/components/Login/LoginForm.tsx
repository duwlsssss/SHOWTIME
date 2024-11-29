import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import * as S from '@/pages/Login/Login.styles';
import { LoginFormData, LoginFormErrors } from '@/types/login';
import { validateLoginForm, getAuthErrorMessage } from './LoginValidation';

const auth = getAuth();

export function LoginForm() {
	const [user, setUser] = useState<User | null>(auth.currentUser);
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<LoginFormErrors>({});
	const [isLoading, setIsLoading] = useState(false);

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
			await signOut(auth);
			setUser(null);
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
			const userCredential = await signInWithEmailAndPassword(
				auth,
				formData.email,
				formData.password,
			);
			setUser(userCredential.user);
		} catch (error) {
			const errorMessage = getAuthErrorMessage(error);
			setErrors({ password: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

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
