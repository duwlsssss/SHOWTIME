import * as S from './ScheduleManagement.styles';
import { ScheduleList, Loading, CalendarComponent } from '@/components';
import { useAppSelector } from '@/hooks/useRedux';
// import { setisLoading } from '@/redux/actions/scheduleActions';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);

	// const dispatch = useAppDispatch();
	// dispatch(setisLoading(false));
	// console.log(isLoading);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<S.ScheduleManagementContainer>
			<CalendarComponent isManagementPage={true} />
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
