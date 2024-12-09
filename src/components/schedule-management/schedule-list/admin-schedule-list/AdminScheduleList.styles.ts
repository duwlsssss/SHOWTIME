import styled from 'styled-components';

export const ScheduleListContainer = styled.div`
	padding: var(--space-medium);
	width: 300px;
	height: 550px;
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-large);
	overflow-y: auto;
	h3 {
		margin-bottom: var(--space-medium);
		font-size: var(--font-large);
	}

	.time {
		color: var(--color-blue);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-small);
	}
`;

export const DateText = styled.span`
	font-weight: 700;
`;
