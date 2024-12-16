import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.nav`
	display: flex;
	gap: var(--space-large);
	align-items: center;
`;
export const NavLink = styled(Link)<{ $isActive: boolean }>`
	color: ${(props) => props.$isActive && 'var(--color-blue)'};
	font-size: 18px;
	text-decoration: none;
	padding: 10px;
`;
