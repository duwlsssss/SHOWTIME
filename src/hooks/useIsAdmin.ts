import { useAppSelector } from '@/hooks/useRedux';

export default function useIsAdmin() {
	const user = useAppSelector((state) => state.user.user);
	return user?.role === 'admin';
}
