import * as S from './AdminScheduleList.styles';
import { useAppSelector } from '@/hooks/useRedux';
import { formatToKoreanDate } from '@/utils/dateFormatter';
import AdminScheduleCard from '../../schedule-card/admin-schedule-card/AdminScheduleCard';

export const AdminScheduleList = () => {
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);

	return (
		<S.ScheduleListContainer>
			<h3>
				{selectedDate ? (
					<>
						<S.DateText>{formatToKoreanDate(selectedDate as Date)}</S.DateText> 의 업무 현황
					</>
				) : (
					'Loading...'
				)}
			</h3>
			{filteredSchedules.length > 0 ? (
				<ul>
					{filteredSchedules.map((schedule) => (
						<AdminScheduleCard schedulesItem={schedule} key={schedule.schedule_id} />
					))}
				</ul>
			) : (
				<p>오늘은 쉬는 날 😚</p>
			)}
		</S.ScheduleListContainer>
	);
};
