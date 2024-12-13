import * as S from './Navbar.styles';

export function NavbarItem({ url, onClick, label, isActive }) {
	return (
		<div>
			<S.NavLink to={url} onClick={onClick} isActive={isActive}>
				{label}
			</S.NavLink>
		</div>
	);
}
