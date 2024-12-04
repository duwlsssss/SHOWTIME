import { AdminScheduleList } from './admin-schedule-list/AdminScheduleList';
import { UserScheduleList } from './user-schedule-list/UserScheduleList';

export const ScheduleList = () => {
	const isAdmin = true;
	return <>{isAdmin ? <AdminScheduleList /> : <UserScheduleList />}</>;
};
