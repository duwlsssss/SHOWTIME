import styled from 'styled-components';

// 스타일링
export const TableContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	border-radius: var(--small-border-radius) var(--small-border-radius) 0 0;
	overflow: hidden;
	box-shadow: 1px 1px 5px 1px #eee;
`;

export const Lists = styled.li<{ cursor?: string; background?: string }>`
	cursor: ${(p) => p.cursor || 'auto'};
	background: ${(p) => p.background || 'transparent'};
	padding: 17px 45px;
	border-bottom: 1px solid #eee;
`;

export const InnerUnorderLists = styled.ul`
	display: flex;
	align-items: center;
`;

export const InnerLists = styled.li`
	width: 20%;
	text-align: center;
`;
