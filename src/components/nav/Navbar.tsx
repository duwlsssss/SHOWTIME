import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import * as S from './Navbar.styles';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setUser, clearUser } from '@/redux/actions/userAction';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export function Navbar() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
				const additionalData = userDoc.data();

				const userData = {
					id: currentUser.uid,
					email: currentUser.email,
					userName: additionalData?.user_name ?? '',
					userAlias: additionalData?.user_alias ?? '',
					age: additionalData?.age ?? 0,
					role: additionalData?.role ?? '',
					gender: additionalData?.gender ?? '',
					position: additionalData?.position ?? '',
					shiftType: additionalData?.shift_type ?? '',
				};

				dispatch(setUser(userData));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			dispatch(clearUser());
		} catch (error) {
			console.error('로그아웃 에러:', error);
		}
	};

	return (
		<S.NavContainer>
			<Link to={user ? '/' : '/login'}>홈</Link>
			{user ? (
				<>
					<Link to="/salary-details">급여 내역</Link>
					<Link to="/schedule-management">일정 관리</Link>
					<Link to="/profile">프로필</Link>
					<Link to="#" onClick={handleLogout}>
						로그아웃
					</Link>
				</>
			) : (
				<>
					<Link to="/register">회원가입</Link>
					<Link to="/login">로그인</Link>
				</>
			)}
		</S.NavContainer>
	);
}
