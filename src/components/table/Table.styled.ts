import styled from 'styled-components';

// 스타일링
export const TableContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	border-radius: var(--small-border-radius) var(--small-border-radius) 0 0;
	overflow: hidden;
	box-shadow: var(--box-shadow-small);
`;

export const Lists = styled.li<{ cursor?: string; background?: string }>`
	cursor: ${(p) => p.cursor || 'auto'};
	background: ${(p) => p.background || 'transparent'};
	padding: 17px 45px;
	border-bottom: 1px solid var(--color-light-gray);
`;

export const InnerUnorderLists = styled.ul`
	display: flex;
	align-items: center;
`;

export const InnerLists = styled.li`
	width: 20%;
	text-align: center;
`;
