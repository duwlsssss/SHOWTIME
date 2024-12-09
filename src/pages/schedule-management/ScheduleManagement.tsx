import * as S from './ScheduleManagement.styles';
import { ScheduleList, Loading } from '@/components';
import { AdminCalendarComponent } from '@/components/schedule-management/calendar/admin-calender/AdminCalender';
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
			<AdminCalendarComponent isManagementPage={true} />
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
