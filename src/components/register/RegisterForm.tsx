import { useState } from 'react';
import * as S from '@/pages/Register/Register.styles';
import {
	FormData,
	FormErrors,
	RegisterFormProps,
	ROLE_OPTIONS,
	POSITION_OPTIONS,
	GENDER_OPTIONS,
	validateForm,
} from '@/pages';

export function RegisterForm({ onSubmit, isSubmitting, submitError }: RegisterFormProps) {
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
		confirmPassword: '',
		role: '',
		gender: '',
		age: '',
		position: '',
		workingHours: '',
	});
	const [errors, setErrors] = useState<FormErrors>({});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = validateForm(formData);
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		await onSubmit(formData);
	};

	return (
		<S.RegisterContainer>
			<S.LeftSection>
				<S.Logo>
					<img src="/logo.png" alt="로고" />
				</S.Logo>
				<S.WelcomeText>
					<h1>환영합니다!</h1>
					<p>회원가입을 통해 다양한 서비스를 이용해보세요.</p>
				</S.WelcomeText>
			</S.LeftSection>
			<S.RightSection>
				<S.FormContainer>
					<S.FormTitle>회원가입</S.FormTitle>
					<form onSubmit={handleSubmit}>
						<S.FormField>
							<S.Label htmlFor="email">이메일</S.Label>
							<S.Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange}
								$validation={errors.email ? 'invalid' : 'default'}
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
								$validation={errors.password ? 'invalid' : 'default'}
							/>
							{errors.password && <S.ErrorMessage>{errors.password}</S.ErrorMessage>}
						</S.FormField>

						<S.FormField>
							<S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
							<S.Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								$validation={errors.confirmPassword ? 'invalid' : 'default'}
							/>
							{errors.confirmPassword && <S.ErrorMessage>{errors.confirmPassword}</S.ErrorMessage>}
						</S.FormField>

						<S.FormField>
							<S.Label htmlFor="role">역할</S.Label>
							<S.Select
								id="role"
								name="role"
								value={formData.role}
								onChange={handleInputChange}
								$validation={errors.role ? 'invalid' : 'default'}
							>
								<option value="">선택하세요</option>
								{Object.values(ROLE_OPTIONS).map((role) => (
									<option key={role.value} value={role.value}>
										{role.label}
									</option>
								))}
							</S.Select>
							{errors.role && <S.ErrorMessage>{errors.role}</S.ErrorMessage>}
						</S.FormField>

						<S.FormField>
							<S.Label htmlFor="position">직책</S.Label>
							<S.Select
								id="position"
								name="position"
								value={formData.position}
								onChange={handleInputChange}
								$validation={errors.position ? 'invalid' : 'default'}
							>
								<option value="">선택하세요</option>
								{Object.values(POSITION_OPTIONS).map((position) => (
									<option key={position.value} value={position.value}>
										{position.label}
									</option>
								))}
							</S.Select>
							{errors.position && <S.ErrorMessage>{errors.position}</S.ErrorMessage>}
						</S.FormField>

						<S.FormField>
							<S.Label htmlFor="gender">성별</S.Label>
							<S.Select
								id="gender"
								name="gender"
								value={formData.gender}
								onChange={handleInputChange}
								$validation={errors.gender ? 'invalid' : 'default'}
							>
								<option value="">선택하세요</option>
								{GENDER_OPTIONS.map((gender) => (
									<option key={gender} value={gender}>
										{gender}
									</option>
								))}
							</S.Select>
							{errors.gender && <S.ErrorMessage>{errors.gender}</S.ErrorMessage>}
						</S.FormField>

						<S.FormField>
							<S.Label htmlFor="age">나이</S.Label>
							<S.Input
								id="age"
								name="age"
								type="number"
								value={formData.age}
								onChange={handleInputChange}
								$validation={errors.age ? 'invalid' : 'default'}
							/>
							{errors.age && <S.ErrorMessage>{errors.age}</S.ErrorMessage>}
						</S.FormField>

						<S.SubmitButton type="submit" disabled={isSubmitting}>
							{isSubmitting ? '처리 중...' : '가입하기'}
						</S.SubmitButton>
						{submitError && <S.ErrorMessage>{submitError}</S.ErrorMessage>}
					</form>
				</S.FormContainer>
			</S.RightSection>
		</S.RegisterContainer>
	);
}
