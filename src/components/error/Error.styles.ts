import styled from 'styled-components';

export const ErrorContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	gap: var(--space-medium);
	align-items: center;
`;

export const ErrorText = styled.h2`
	color: var(--color-coral-dark);
	font-size: var(--font-large);
	font-weight: 700;
`;

export const ErrorDetailText = styled.h2`
	color: var(--color-regular-gray);
	font-size: var(--font-large);
	word-break: keep-all;
`;
