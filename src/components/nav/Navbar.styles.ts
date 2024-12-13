import { Link } from 'react-router-dom';
import styled from 'styled-components';

type NavLinkProps = {
	isActive: string;
};
export const NavContainer = styled.nav`
	display: flex;
	gap: var(--space-large);
	align-items: center;
`;
export const NavLink = styled(Link)<NavLinkProps>`
	color: ${(props) => (props.isActive ? 'blue' : 'black')}; /* 기본값을 black으로 설정 */
	font-size: 18px;
	text-decoration: none;
	padding: 10px;

	&:hover {
		color: green;
	}
`;
