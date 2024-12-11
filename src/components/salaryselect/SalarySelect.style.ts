import styled from 'styled-components';

export const SelectContainer = styled.div`
	width: 80%;
	padding: 10px 20px;
	border: 1px solid var(--color-light-gray);
	border-radius: 6px;
	margin: 20px auto 20px;
	display: flex;
	justify-content: center;
	gap: 100px;
	box-shadow: var(--box-shadow-small);
`;

export const SelectBox = styled.select`
	border: none;
	padding: 10px;
	outline: none;
`;
