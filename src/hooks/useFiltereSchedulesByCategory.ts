import { useEffect } from 'react';
import { TScheduleCategory } from '@/types/schedule';
import { useAppDispatch } from './useRedux';
import { getSchedulesFromSupabase } from '@/redux/actions/scheduleActions';

const useFiltereSchedulesByCategory = ({
	isAdmin,
	userId,
	filterCategoryKey,
}: {
	isAdmin: boolean;
	userId?: string;
	filterCategoryKey: TScheduleCategory;
}) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			getSchedulesFromSupabase(
				isAdmin ? undefined : userId,
				filterCategoryKey === '' ? undefined : filterCategoryKey,
			),
		);
	}, [isAdmin, userId, filterCategoryKey]);
};

export default useFiltereSchedulesByCategory;
