import * as S from '../Calendar.styles';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
	filterSchedules,
	getSchedulesFromSupabase,
	selectDate,
} from '@/redux/actions/scheduleActions';
import { formatCalendarDay } from '@/utils/dateFormatter';
import { TSchedule, CalendarComponentProps, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';

export const UserCalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const user = useAppSelector((state) => state.user.user);
	const userId = user?.id;

	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
	}, [isManagementPage]);

	// supabase에서 스케줄 가져오기
	useEffect(() => {
		if (!userId) return;

		const init = async () => {
			await dispatch(getSchedulesFromSupabase(userId));
		};

		init();
	}, [userId]);

	// 오늘 날짜 초기 필터링
	useEffect(() => {
		if (schedules.length > 0 && selectedDate) {
			const todaySchedules = filterSchedulesByDateAndSort(schedules, selectedDate);
			dispatch(filterSchedules(todaySchedules));
		}
	}, [selectedDate, schedules]);

	// 클릭한 날짜 필터링
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));
		const filteredS = filterSchedulesByDateAndSort(schedules, date);
		dispatch(filterSchedules(filteredS));
	};

	// 일정 있는 날짜에 바 표시
	const tileContent = ({ date }: { date: Date }) => {
		const daySchedules = schedules
			.filter((schedule) => {
				const scheduleDate = new Date(schedule.start_date_time);
				return scheduleDate.toDateString() === date.toDateString();
			})
			.sort((a, b) => {
				const aDate = new Date(a.start_date_time);
				const bDate = new Date(b.start_date_time);
				return (
					aDate.getTime() - bDate.getTime() ||
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				);
			})
			.slice(0, 2);

		return daySchedules.length > 0 ? (
			<>
				{daySchedules.map((s: TSchedule) => (
					<S.ScheduleBar key={s.schedule_id} $category={s.category}>
						{SCHEDULE_CATEGORY_LABELS[s.category]}
					</S.ScheduleBar>
				))}
			</>
		) : null;
	};

	return (
		<S.CalenderContainer>
			{/* <div className="calener-category">카테고리 체크</div> */}
			<S.StyledCalendar
				locale="ko-KR"
				onClickDay={handleDateClick}
				value={selectedDate}
				view="month"
				formatDay={formatCalendarDay}
				calendarType="gregory" /* 일요일부터 시작 */
				prev2Label={null} /* 년 단위 이동 없앰 */
				next2Label={null} /* 년 단위 이동 없앰 */
				tileContent={tileContent}
			/>
		</S.CalenderContainer>
	);
};
