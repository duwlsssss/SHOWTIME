import { Link } from 'react-router-dom';
import * as S from './Navbar.styles';

export function Navbar() {
	return (
		<S.NavContainer>
			<Link to="/">홈</Link>
			<Link to="/salary-details">급여 내역</Link>
			<Link to="/schedule-management">일정 관리</Link>
			<Link to="/profile">프로필</Link>
		</S.NavContainer>
	);
}
