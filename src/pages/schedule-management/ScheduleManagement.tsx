import * as S from './ScheduleManagement.styles';
import { ScheduleList, CalendarComponent, Loading, CheckboxGroup } from '@/components';
import { useAppSelector } from '@/hooks/useRedux';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<S.ScheduleManagementContainer>
			<S.CalenderSection>
				<CheckboxGroup />
				<CalendarComponent isManagementPage={true} />
			</S.CalenderSection>
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
