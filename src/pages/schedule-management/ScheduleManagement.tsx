import * as S from './ScheduleManagement.styles';
import { CalendarComponent, ScheduleList } from '@/components';

export function ScheduleManagement() {
	return (
		<S.ScheduleManagementContainer>
			<CalendarComponent isManagementPage={true} state="user" />
			<ScheduleList state="user" />
		</S.ScheduleManagementContainer>
	);
}
