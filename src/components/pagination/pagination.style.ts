import styled from 'styled-components';

export const PageDiv = styled.div`
	padding: 40px 0;
`;

export const PageUl = styled.div`
	display: flex;
	justify-content: center;
	color: #637381;
	font-size: 16px;
	list-style: none;
`;

export const PageLi = styled.li`
	width: 34px;
	height: 34px;
	margin-right: 8px;
	border: 1px solid #dfe4ea;
	line-height: 34px;
	border-radius: 6px;
	text-align: center;
`;

export const PageButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	&:focus {
		background-color: var(--color-skyblue);
		color: var(--color-white);
	}
`;
