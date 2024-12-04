import * as S from './ScheduleManagement.styles';
import { ScheduleList, Loading } from '@/components';
import { AdminCalendarComponent } from '@/components/schedule-management/clalendar/admin-calendar/AdminCalendar';
import { useAppSelector } from '@/hooks/useRedux';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);

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
