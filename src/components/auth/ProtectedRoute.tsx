import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = useAppSelector((state) => state.user.user);

	if (!user) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
}
