import * as S from './adminScheduleList.styles';
import { useAppSelector } from '@/hooks/useRedux';
import { toDate, formatToKoreanDate } from '@/utils/dateFormatter';

export const AdminScheduleList = () => {
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);

	return (
		<S.ScheduleListContainer>
			<h3>
				{selectedDate ? (
					<>
						<S.DateText>{formatToKoreanDate(selectedDate as Date)}</S.DateText> 의 업무
					</>
				) : (
					'Loading...'
				)}
			</h3>
			{filteredSchedules.length > 0 ? (
				<ul>
					{filteredSchedules.map((schedule) => (
						<li key={schedule.schedule_id}>
							<strong>{schedule.category}</strong>: {schedule.description}
							<strong className="time">{String(toDate(schedule.start_date_time))}</strong>:{' '}
							{schedule.end_date_time ? String(toDate(schedule.end_date_time)) : ''}
						</li>
					))}
				</ul>
			) : (
				<p>오늘은 쉬는 날 😚</p>
			)}
		</S.ScheduleListContainer>
	);
};
