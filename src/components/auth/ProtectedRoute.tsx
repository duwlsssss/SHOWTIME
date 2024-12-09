import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { Loading } from '@/pages';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, isAuthInitialized } = useAppSelector((state) => state.user);

	if (!isAuthInitialized) {
		return <Loading />;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};
