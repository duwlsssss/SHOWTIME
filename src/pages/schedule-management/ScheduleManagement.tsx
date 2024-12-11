import * as S from './ScheduleManagement.styles';
import { ScheduleList, CalendarComponent, Loading } from '@/components';
import { useAppSelector } from '@/hooks/useRedux';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);

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
