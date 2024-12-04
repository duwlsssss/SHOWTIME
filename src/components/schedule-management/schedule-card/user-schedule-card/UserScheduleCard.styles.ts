import styled from 'styled-components';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TScheduleCategory } from '@/types/schedule';

export const ScheduleCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-left: 1.5px solid var(--color-light-gray);
	margin-top: -12px;
`;

export const TimeContainerUp = styled.div`
	display: flex;
	gap: var(--space-small);
	background-color: var(--color-white);
	z-index: 2;
`;

export const TimeDot = styled.div<{ $category: TScheduleCategory }>`
	min-width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-left: -6.5px;
	background-color: ${({ $category }) =>
		$category === 'ticket'
			? 'var(--color-blue)'
			: $category === 'snack'
				? 'var(--color-caramel)'
				: 'var(--color-coral)'};
`;
export const TimeDotEmpty = styled(TimeDot)`
	background-color: var(--color-white);
	border: 2px solid
		${({ $category }) =>
			$category === 'ticket'
				? 'var(--color-blue)'
				: $category === 'snack'
					? 'var(--color-caramel)'
					: 'var(--color-coral)'};
`;

export const TimeText = styled.div`
	font-size: var(--font-medium);
	color: var(--color-dark-gray);
	white-space: nowrap;
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

export const TimeDotDown = styled(TimeDot)`
	margin-top: 6px;
`;

export const TimeDotEmptyDown = styled(TimeDotEmpty)`
	margin-top: 6px;
`;

export const TimeTextDown = styled(TimeText)`
	margin-top: 6px;
`;
