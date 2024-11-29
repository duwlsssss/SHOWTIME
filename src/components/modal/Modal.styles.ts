import styled from 'styled-components';

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;

export const ModalContent = styled.div`
	background: var(--color-pale-gray);
	padding: 60px 20px 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	width: 900px;
	max-width: 90%;
	text-align: center;
	position: relative;

	.closeBtn {
		border: none;
		cursor: pointer;
		position: absolute;
		padding: 0;
		right: 20px;
		top: 20px;
		background-color: transparent;

		& svg {
			width: 25px;
			height: 25px;
			color: var(--color-dark-gray);
		}
	}
`;

export const ConfirmModalContent = styled.div`
	background: var(--color-pale-gray);
	padding: 40px 20px 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	width: 500px;
	max-width: 60%;
	text-align: center;
	z-index: 1000;
	position: relative;

	p {
		margin: 20px 0;
	}

	.firstBtn {
		margin-right: 20px;
	}

	.queistionIcon {
		width: 200px;
		height: 200px;
	}
`;
