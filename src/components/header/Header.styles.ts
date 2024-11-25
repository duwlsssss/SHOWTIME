import styled from 'styled-components';

export const HeaderContainer = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 60px;
	font-size: var(--font-medium);
	z-index: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 var(--space-medium);
	border-bottom: 1px solid var(--color-light-gray);
`;
