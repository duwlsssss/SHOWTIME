import styled from 'styled-components';

export const ModalBox = styled.div`
	width: 80%;
	height: auto;
	margin: 0 auto;
	margin-bottom: 20px;
	background-color: #f9f9f9;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Info = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;

	& > p {
		margin: 0;
		padding: 5px 10px;
		font-size: 14px;
		color: #333;
	}
`;

export const Label = styled.label`
	display: inline-block;
	background-color: skyblue;
	color: white;
	padding: 10px 15px;
	border-radius: 5px;
	cursor: pointer;
	font-size: 14px;
	margin-top: 10px;

	&:hover {
		background-color: #0056b3;
	}
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 100px;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	font-size: 14px;
	margin-top: 10px;
	resize: none;

	&:focus {
		outline: none;
		border-color: #007bff;
	}
`;
