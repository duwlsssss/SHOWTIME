import styled from 'styled-components';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TScheduleCategory } from '@/types/schedule';

export const ScheduleCardContainer = styled.div<{ $category: TScheduleCategory }>`
	position: relative;
	padding: 10px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	height: 120px;
	justify-content: space-between;
	gap: 10px;
	/* 왼쪽 색상 막대 추가 */
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 2px;
		background-color: ${({ $category }) =>
			$category === 'ticket'
				? 'var(--color-blue)'
				: $category === 'snack'
					? 'var(--color-caramel)'
					: 'var(--color-coral)'};
	}
`;

export const ScheduleCardHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

export const ScheduleCardHeaderIcon = styled.div`
	padding-left: 10px;
	display: flex;
	gap: 5px;
`;

export const ScheduleCardTime = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

export const ScheduleCardDescrption = styled.div`
	display: flex;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: var(--space-xsmall);
	margin-left: 110px;
	margin-top: -2px;
	opacity: 0;
	transition: opacity 0.2s;

	${ScheduleCardContainer}:hover & {
		opacity: 1;
	}
`;

export const EditIcon = styled(MdEdit)`
	cursor: pointer;
	transition: opacity 0.2s;
	&:hover {
		color: var(--color-blue);
	}
`;

export const DeleteIcon = styled(MdDelete)`
	cursor: pointer;
	transition: opacity 0.2s;
	&:hover {
		color: var(--color-blue);
	}
`;

export const ContentContainer = styled.div`
	padding: var(--space-large) var(--space-medium) 40px;
`;

export const CategoryText = styled.div`
	font-size: var(--font-large);
`;

export const DescriptionText = styled.div`
	font-size: var(--font-medium);
	color: var(--color-dark-gray);
	margin-top: var(--space-small);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const TimeContainerDown = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-small);
	z-index: 1;
`;
