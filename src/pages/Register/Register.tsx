import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/pages';
import { useRegister } from '@/hooks/useRegister';
import { FormData } from '@/types/register';

export function Register() {
	const navigate = useNavigate();
	const { register, isLoading, error } = useRegister();

	const handleRegister = async (FormData: FormData): Promise<void> => {
		try {
			await register(FormData);
			alert('회원가입이 완료되었습니다.');
			navigate('/login');
		} catch (err) {
			console.error('Registration error:', err);
		}
	};

	return <RegisterForm onSubmit={handleRegister} isSubmitting={isLoading} submitError={error} />;
}
