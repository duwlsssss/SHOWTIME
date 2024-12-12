import styled from 'styled-components';
import { TScheduleCategory, categoryColors } from '@/types/schedule';
import useIsAdmin from '@/hooks/useIsAdmin';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getSchedulesFromSupabase, setfilterCategory } from '@/redux/actions/scheduleActions';

interface TCheckboxItemProps {
	categoryKey: TScheduleCategory;
	item: string;
}

const CheckboxItem = ({ categoryKey, item }: TCheckboxItemProps) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const filterCategoryKey = useAppSelector((state) => state.schedule.filterCategoryKey);
	const isAdmin = useIsAdmin();
	const userId = user?.id;

	const handleFilteredClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id as TScheduleCategory;
		dispatch(setfilterCategory(id));
		positionFilteredSchedules({ isAdmin, userId, id });
	};

	const positionFilteredSchedules = ({
		isAdmin,
		userId,
		id,
	}: {
		isAdmin: boolean;
		userId?: string;
		id: TScheduleCategory;
	}) => {
		dispatch(getSchedulesFromSupabase(isAdmin ? undefined : userId, id === '' ? undefined : id));
	};

	return (
		<ListItem key={categoryKey}>
			<Label htmlFor={item}>
				<RadioInput
					type="radio"
					name="option"
					id={categoryKey}
					onChange={(e) => handleFilteredClick(e)}
					checked={filterCategoryKey === categoryKey}
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
		background-color: ${(props) => categoryColors[props.id as TScheduleCategory]};
	}
`;

const RadioText = styled.span`
	font-size: var(--font-medium);
`;
