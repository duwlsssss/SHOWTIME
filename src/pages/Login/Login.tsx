import { useState } from 'react';
import { useCustomLogin } from '@/hooks/useFirebaseCustomLogin';
import * as S from './Login.styles';

export function Login() {
	const { user, loginWithUserId, logout } = useCustomLogin();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		await loginWithUserId(userId, password);
	};

	return (
		<S.LoginContainer>
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
		</S.LoginContainer>
	);
}
