import styled from 'styled-components';

export const SearchContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SearchWrapper = styled.ul`
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

export const SearchItem = styled.li`
	padding: var(--space-medium);
	border-bottom: 1px solid var(--color-light-gray);
	cursor: pointer;

	&:hover {
		color: var(--color-blue);
	}
`;

export const TextUserName = styled.span`
	margin-right: var(--space-medium);
`;

export const TextUserAlias = styled.span`
	color: var(--color-light-gray);
`;
