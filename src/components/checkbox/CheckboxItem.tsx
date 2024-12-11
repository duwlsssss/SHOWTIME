import useIsAdmin from '@/hooks/useIsAdmin';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getSchedulesFromSupabase } from '@/redux/actions/scheduleActions';

import styled from 'styled-components';

interface CheckboxItemProps {
	categoryKey: string;
	item: '매표' | '매점' | '플로어' | '전체'; // categoryMap의 value
}

const CheckboxItem = ({ item, categoryKey }: CheckboxItemProps) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const isAdmin = useIsAdmin();
	const userId = user?.id;

	const handleFilteredClick = (e) => {
		const id = e.target.id as string;
		positionFilteredSchedules({ isAdmin, userId, id });
	};

	const positionFilteredSchedules = ({ isAdmin, userId, id }) => {
		if (isAdmin) {
			if (categoryKey === 'all') {
				dispatch(getSchedulesFromSupabase());
			} else {
				dispatch(getSchedulesFromSupabase(undefined, id));
			}
		} else {
			if (categoryKey === 'all') {
				dispatch(getSchedulesFromSupabase(userId));
			}
			dispatch(getSchedulesFromSupabase(userId, id));
		}
	};

	// 각 항목에 대한 색상 설정

	return (
		<ListItem key={categoryKey}>
			<Label htmlFor={item}>
				<RadioInput
					type="radio"
					name="option"
					id={categoryKey}
					onChange={(e) => handleFilteredClick(e)}
					defaultChecked={categoryKey === 'all'}
					color={categoryKey}
				/>
				<RadioText>{item}</RadioText>
			</Label>
		</ListItem>
	);
};

export default CheckboxItem;

const ListItem = styled.li`
	list-style: none;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 18px;
	height: 18px;
	border: 2px solid #ccc;
	border-radius: 50%;
	outline: none;
	cursor: pointer;
	margin-bottom: 3px;
	&:checked {
		background-color: ${(props) =>
			props.color !== 'all'
				? props.color === 'ticket'
					? 'var(--color-blue)'
					: props.color === 'floor'
						? 'var(--color-coral)'
						: 'var(--color-caramel)'
				: '#0d6efd'};

		box-shadow: 0 0 0 1.6px
			${(props) =>
				props.color !== 'all'
					? props.color === 'ticket'
						? 'var(--color-blue)'
						: props.color === 'floor'
							? 'var(--color-coral)'
							: 'var(--color-caramel)'
					: '#0d6efd'};
	}
`;

const RadioText = styled.span`
	font-size: 20px;
`;
