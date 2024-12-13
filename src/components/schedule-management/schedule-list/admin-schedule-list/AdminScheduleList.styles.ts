import styled from 'styled-components';

export const ScheduleListContainer = styled.div`
	padding: var(--space-large);
	width: 300px;
	height: 100%;
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-large);
	overflow-y: auto;
	h3 {
		margin-bottom: var(--space-large);
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
