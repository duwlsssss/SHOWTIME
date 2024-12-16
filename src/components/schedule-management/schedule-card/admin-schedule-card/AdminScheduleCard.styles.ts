import styled from 'styled-components';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TScheduleCategory } from '@/types/schedule';

export const ScheduleCardContainer = styled.div<{ $category: TScheduleCategory }>`
	display: flex;
	flex-direction: column;
	gap: var(--space-medium);
	padding: var(--space-small);
	border-left: 3px solid
		${({ $category }) =>
			$category === 'ticket'
				? 'var(--color-blue)'
				: $category === 'snack'
					? 'var(--color-caramel)'
					: 'var(--color-coral)'};
`;

export const YesterdayScheduleText = styled.p`
	color: var(--color-light-gray);
`;

export const ScheduleCardHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

export const UserInfo = styled.div``;

export const UserName = styled.span`
	font-weight: 700;
`;

export const UserAlias = styled.span`
	margin-left: var(--space-small);
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: var(--space-xsmall);
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

export const ScheduleCardMain = styled.div`
	display: flex;
	gap: var(--space-small);
	font-weight: 700;
`;

export const ScheduleCategory = styled.span``;

export const ScheduleTime = styled.span`
	color: var(--color-regular-gray);
`;

export const ScheduleDescription = styled.div`
	display: flex;
	color: var(--color-regular-gray);
	white-space: nowrap;
	overflow: hidden;
`;
