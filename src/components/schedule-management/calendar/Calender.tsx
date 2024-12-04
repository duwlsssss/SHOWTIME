import { CalendarComponentProps } from '@/types/schedule';
import { AdminCalendarComponent } from './admin-calender/AdminCalender';
import { UserCalendarComponent } from './user-calender/UserCalendar';
import useIsAdmin from '@/hooks/useIsAdmin';

export const CalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const isAdmin = useIsAdmin();

	if (isAdmin) {
		return <AdminCalendarComponent isManagementPage={isManagementPage} />;
	}

	return <UserCalendarComponent isManagementPage={isManagementPage} />;
};
