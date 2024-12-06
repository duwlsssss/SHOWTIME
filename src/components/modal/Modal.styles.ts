import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

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
	z-index: 10;
`;

export const ModalContent = styled.div`
	background: var(--color-pale-gray);
	height: 500px;
	padding: var(--space-large);
	border-radius: var(--small-border-radius);
	width: 900px;
	text-align: center;
	z-index: 12;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

export const ConfirmModalContent = styled.div`
	background: var(--color-pale-gray);
	width: 500px;
	height: 300px;
	padding: var(--space-large);
	border-radius: var(--small-border-radius);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	z-index: 11;

	.queistionIcon {
		width: 100px;
		height: 100px;
	}
`;

export const CloseIcon = styled(IoClose)`
	align-self: flex-end;
	cursor: pointer;
	transition: color 0.2s;

	&:hover {
		color: var(--color-blue);
	}
`;

export const BtnContainer = styled.div`
	display: flex;
	gap: var(--space-medium);
`;
