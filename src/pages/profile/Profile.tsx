import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import * as S from './Profile.styles';
import { TUser } from '@/types/auth';
import { ROLE_OPTIONS, GENDER_OPTIONS } from '@/types/register';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Navigate } from 'react-router-dom';
import { useLoginAuthObserver } from '@/hooks/useLoginAuthObserver';

// 날짜 변환 함수 추가
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export function Profile() {
	const { user, isAuthInitialized } = useAppSelector((state) => state.user);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<TUser | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useLoginAuthObserver();

	useEffect(() => {
		if (user) {
			setFormData(user);
		}
	}, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		if (name === 'phoneNumber') {
			// 숫자만 입력 가능
			const numbersOnly = value.replace(/[^0-9]/g, '');
			setFormData((prev) => (prev ? { ...prev, [name]: numbersOnly } : null));

			// 유효성 검사
			if (numbersOnly.length > 0 && (numbersOnly.length < 10 || numbersOnly.length > 11)) {
				setErrors((prev) => ({ ...prev, phoneNumber: '전화번호는 10-11자리여야 합니다' }));
			} else {
				setErrors((prev) => ({ ...prev, phoneNumber: '' }));
			}
		} else {
			setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
		}
	};

	const handleSave = async () => {
		if (!formData || !user) return;

		// 전화번호 유효성 검사
		if (
			formData.phoneNumber &&
			(formData.phoneNumber.length < 10 || formData.phoneNumber.length > 11)
		) {
			return;
		}

		setIsSubmitting(true);
		try {
			const userRef = doc(db, 'users', user.id);
			await updateDoc(userRef, {
				user_name: formData.userName,
				user_alias: formData.userAlias,
				gender: formData.gender,
				phone_number: formData.phoneNumber,
			});

			setIsEditing(false);
		} catch (error) {
			console.error('프로필 업데이트 ���패:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// 인증 초기화 전이면 로딩 표시
	if (!isAuthInitialized) return <div>Initializing...</div>;

	// 인증은 됐지만 user가 없으면 로그인 페이지로 리다이렉트
	if (isAuthInitialized && !user) {
		return <Navigate to="/login" />;
	}

	if (!formData) return <div>Loading...</div>;

	return (
		<S.ProfileContainer>
			<S.FormContainer>
				<S.TitleContainer>
					<S.TitleGroup>
						<S.FormTitle>프로필</S.FormTitle>
						<S.FormSubTitle>개인정보 및 설정</S.FormSubTitle>
					</S.TitleGroup>
					{!isEditing && <S.EditButton onClick={() => setIsEditing(true)}>수정</S.EditButton>}
				</S.TitleContainer>

				<S.FormField>
					<S.Label>이름</S.Label>
					<S.Value>
						<S.Input
							name="userName"
							value={formData.userName}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>별명</S.Label>
					<S.Value>
						<S.Input
							name="userAlias"
							value={formData.userAlias}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>이메일</S.Label>
					<S.Value>
						<S.Input value={formData.email || ''} disabled />
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>전화번호</S.Label>
					<S.Value>
						<S.Input
							name="phoneNumber"
							value={formData.phoneNumber || ''}
							onChange={handleInputChange}
							disabled={!isEditing}
							placeholder={isEditing ? '숫자만 입력 (10-11자리)' : ''}
						/>
					</S.Value>
				</S.FormField>
				{isEditing && errors.phoneNumber && <S.ErrorMessage>{errors.phoneNumber}</S.ErrorMessage>}

				<S.FormField>
					<S.Label>직책</S.Label>
					<S.Value>
						<S.Input value={formData.role ? ROLE_OPTIONS[formData.role].label : ''} disabled />
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>성별</S.Label>
					<S.Value>
						<select
							value={formData.gender}
							disabled={!isEditing}
							onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
						>
							{Object.values(GENDER_OPTIONS).map((gender) => (
								<option key={gender.value} value={gender.value}>
									{gender.label}
								</option>
							))}
						</select>
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>입사일</S.Label>
					<S.Value>
						<S.Input value={formData.created_at ? formatDate(formData.created_at) : ''} disabled />
					</S.Value>
				</S.FormField>

				{isEditing && (
					<S.ButtonGroup>
						<S.Button onClick={() => setIsEditing(false)}>취소</S.Button>
						<S.Button
							onClick={handleSave}
							disabled={
								!!(
									isSubmitting ||
									(formData.phoneNumber &&
										(formData.phoneNumber.length < 10 || formData.phoneNumber.length > 11))
								)
							}
							$primary={true}
						>
							{isSubmitting ? '저장 중...' : '저장하기'}
						</S.Button>
					</S.ButtonGroup>
				)}
			</S.FormContainer>
		</S.ProfileContainer>
	);
}
