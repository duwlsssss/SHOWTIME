import * as S from './ScheduleManagement.styles';
import { ScheduleList, CalendarComponent, Loading } from '@/components';
import { useAppSelector } from '@/hooks/useRedux';
import CheckboxGroup from '@/components/checkbox/CheckboxGroup';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<S.ScheduleManagementContainer>
			<CheckboxGroup />

			<CalendarComponent isManagementPage={true} />
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
