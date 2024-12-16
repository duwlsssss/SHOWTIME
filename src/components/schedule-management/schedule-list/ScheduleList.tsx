import useIsAdmin from '@/hooks/useIsAdmin';
import { AdminScheduleList } from './admin-schedule-list/AdminScheduleList';
import { UserScheduleList } from './user-schedule-list/UserScheduleList';

export const ScheduleList = () => {
	const isAdmin = useIsAdmin();

	if (isAdmin) {
		return <AdminScheduleList />;
	}
	return <UserScheduleList />;
};
