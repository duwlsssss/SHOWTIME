import styled from 'styled-components';

export const NotFoundContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Inner = styled.div`
	text-align: center;
	width: 80%;
`;

export const Title = styled.div`
	font-size: var(--font-xlarge);
`;

export const Description = styled.div`
	margin: 1rem 0;
	line-height: 1.5;
	word-break: keep-all;
	color: var(--color-dark-gray);
`;
