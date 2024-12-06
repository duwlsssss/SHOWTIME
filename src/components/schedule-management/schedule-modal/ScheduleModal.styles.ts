import styled from 'styled-components';
import Input from '../../input/input';
import { IoClose } from 'react-icons/io5';
import { RadioInputProps, categoryColors } from '@/types/schedule';

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3;
`;

export const ModalContent = styled.form`
	background: white;
	padding: var(--space-large);
	border-radius: var(--small-border-radius);
	width: 500px;
	height: 430px;
	display: flex;
	flex-direction: column;
	gap: var(--space-medium);
`;

export const ModalContentTitle = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: var(--font-large);
	font-weight: 700;
`;

export const CloseIcon = styled(IoClose)`
	cursor: pointer;
	transition: color 0.2s;

	&:hover {
		color: var(--color-blue);
	}
`;

export const ModalWrapperSubTitle = styled.h2`
	margin-top: var(--space-medium);
	color: var(--color-regular-gray);
	font-weight: 700;
`;

export const SearchInputContainer = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-medium);
`;

export const InputWrapper = styled.div``;

export const SearchIcon = styled.div`
	font-size: var(--font-large);
	cursor: pointer;
`;

export const ModalSearchInput = styled(Input)`
	width: 300px;
`;

export const ErrorMessage = styled.p`
	position: absolute;
	margin-top: var(--space-xsmall);
	font-size: var(--font-small);
	color: var(--color-coral-dark);
`;

export const ModalScheduleDateInput = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-large);
`;

export const DateTimeInput = styled(Input)`
	border: none;
	font-size: 14px;
	&:focus {
		border: none;
		outline: none;
	}
	&::-webkit-calendar-picker-indicator {
		//아이콘 custom
		background-image: none;
		background-size: contain;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`;

export const TimeWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-small);
`;

export const TimeInput = styled(Input)`
	width: 35px;
	text-align: center;
`;

export const ModalToggleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-medium);
	margin: var(--space-medium) 0;
	min-height: 30px;
`;

export const StyledSelect = styled.select<{ $error?: boolean }>`
	appearance: none; /* 기본 화살표 제거 */
	padding: var(--space-small);
	height: 36px;
	width: 90px;
	border-radius: var(--small-border-radius);
	border: 1px solid
		${({ $error }) => ($error ? 'var(--color-coral-dark)' : 'var(--color-dark-gray)')};
	background-color: white;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 0.75rem center;
	&:focus {
		outline: 1px solid ${({ $error }) => ($error ? 'var(--color-coral-dark)' : 'var(--color-blue)')};
	}
`;

export const LastModalWrapperSubTitle = styled(ModalWrapperSubTitle)`
	margin: 0;
`;

export const WorkUl = styled.ul`
	display: flex;
	align-items: center;
	gap: var(--space-medium);
`;

export const WorkLi = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-xsmall);
`;

export const RadioInput = styled.input<RadioInputProps>`
	appearance: none; /* 기본 스타일 없앰 */
	width: 20px;
	height: 20px;
	border: 2px solid ${({ $categoryType }) => categoryColors[$categoryType]};
	border-radius: var(--xsmall-border-radius);
	cursor: pointer;

	border-color: ${({ $categoryType }) => categoryColors[$categoryType]};
	&:checked {
		background-color: ${({ $categoryType }) => categoryColors[$categoryType]};
		&::after {
			content: '✓';
			font-size: var(--font-large);
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: -2.5px;
		}
	}
`;

export const DescriptionInput = styled(Input)`
	width: 300px;
`;

export const ButtonContainer = styled.div`
	align-self: flex-end;
`;