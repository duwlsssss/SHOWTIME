import styled from 'styled-components';

export const LayoutContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const MainSection = styled.div`
	display: flex;
	flex: 1;
	margin-top: 60px;
`;

export const ContentArea = styled.div`
	flex: 1;
	padding: var(--space-large);
`;
