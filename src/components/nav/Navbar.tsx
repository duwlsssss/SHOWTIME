import * as S from './Navbar.styles';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { persistor } from '@/redux/store';
import { clearSchedules } from '@/redux/actions/scheduleActions';
import { useLoginAuthObserver } from '@/hooks/useLoginAuthObserver';
import { NavbarItem } from './NavbarItem';
import { useState } from 'react';

type MenuItem = {
	path: string;
	label: string;
	onClick?: () => void;
};
export function Navbar() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const [activePath, setActivePath] = useState<string>(window.location.pathname);
	useLoginAuthObserver();

	const handleLogout = async () => {
		try {
			await persistor.purge(); // Redux Persist 저장소 초기화
			dispatch(clearSchedules()); // Redux 상태 초기화
			await signOut(auth);
		} catch (error) {
			console.error('로그아웃 중 오류가 발생했습니다:', error);
		}
	};

	const guestMenu: MenuItem[] = [
		{ path: '/register', label: '회원가입' },
		{ path: '/login', label: '로그인' },
	];

	const userMenu: MenuItem[] = [
		{ path: '/', label: '홈' },
		{ path: '/salary-details', label: '급여 내역' },
		{ path: '/schedule-management', label: '일정 관리' },
		{ path: '/profile', label: '프로필' },
		{ path: '#', label: '로그아웃', onClick: handleLogout },
	];

	const menus = user ? userMenu : guestMenu;

	const handleMenuClick = (path: string) => {
		setActivePath(path);
	};

	return (
		<S.NavContainer>
			{menus.map(({ path, label, onClick }) => (
				<NavbarItem
					key={path}
					url={path}
					onClick={() => {
						if (onClick) onClick();
						handleMenuClick(path);
					}}
					label={label}
					$isActive={activePath === path}
				/>
			))}
		</S.NavContainer>
	);
}
