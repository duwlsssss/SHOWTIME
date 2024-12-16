import styled from 'styled-components';

export const ScheduleListContainer = styled.div`
	padding: var(--space-large);
	width: 300px;
	height: 100%;
	max-height: 746px;
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-large);
	overflow-y: auto;
	/* 스크롤바 전체 */
	&::-webkit-scrollbar {
		width: 5px; /* 세로축 스크롤바 폭 너비 */
		height: 5px; /* 가로축 스크롤바 폭 너비 */
	}
	/* 스크롤바 막대 */
	&::-webkit-scrollbar-thumb {
		background: var(--color-light-gray);
		border-radius: var(--small-border-radius);
	}
	/* 스크롤바 트랙 */
	&::-webkit-scrollbar-track {
		background: var(--color-pale-gray);
	}

	h3 {
		margin-bottom: var(--space-large);
		font-size: var(--font-large);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-large);
	}

	.schedule-add-button {
		position: fixed;
		bottom: 75px;
		right: 50px;
		z-index: 3;
	}
`;

export const DateText = styled.span`
	font-weight: 700;
`;
