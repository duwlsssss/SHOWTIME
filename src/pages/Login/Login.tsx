import { useState } from 'react';
import { useCustomLogin } from '@/hooks/useFirebaseCustomLogin';
import styled from 'styled-components';

// 기본 .page-content 클래스를 확장하면서 추가 스타일 적용
const LoginPage = styled.div.attrs({ className: 'page-content' })`
	// 필요한 경우에만 추가 스타일 적용
`;

function Login() {
	const { user, loginWithUserId, logout } = useCustomLogin();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		await loginWithUserId(userId, password);
	};

	return (
		<LoginPage>
			<h2>Login</h2>
			{user ? (
				<div>
					<p>Welcome, {user.userId}</p>
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<div>
					<input
						type="text"
						placeholder="User ID"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleLogin}>Login</button>
				</div>
			)}
		</LoginPage>
	);
}

export default Login;
