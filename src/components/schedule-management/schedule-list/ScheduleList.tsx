import * as S from './ScheduleList.styles';
import { useAppSelector } from '@/hooks/useRedux';
import { toDate } from '@/utils/generateRepeatingSchedules';
import { useEffect } from 'react';

interface ScheduleListProps {
	state: 'admin' | 'user';
}
export const ScheduleList = ({ state }: ScheduleListProps) => {
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);

	useEffect(() => {
		console.log('state:', state);
	}, [state]);

	const formatToKoreanDate = (date) => {
		return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric' }).format(date);
	};

	return (
		<S.ScheduleListContainer>
			<h3>
				{selectedDate ? (
					<>
						<S.DateText>{formatToKoreanDate(selectedDate)}</S.DateText> 의 업무
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
							<strong className="time">{String(toDate(schedule.start_time))}</strong>:{' '}
							{schedule.end_time ? String(toDate(schedule.end_time)) : ''}
						</li>
					))}
				</ul>
			) : (
				<p>오늘은 쉬는 날 😚</p>
			)}
		</S.ScheduleListContainer>
	);
};
