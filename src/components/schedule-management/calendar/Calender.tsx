import { useEffect } from 'react';
import * as S from './Calendar.styles';
import { TSchedule, TCalendarComponentProps, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import useFiltereSchedulesByCategory from '@/hooks/useFiltereSchedulesByCategory';
import useIsAdmin from '@/hooks/useIsAdmin';
import { selectDate, setYear, setMonth } from '@/redux/actions/scheduleActions';
import { formatCalendarDay } from '@/utils/dateFormatter';
import { useEffect } from 'react';

export const CalendarComponent = ({ isManagementPage }: TCalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filterCategoryKey = useAppSelector((state) => state.schedule.filterCategoryKey);
	const user = useAppSelector((state) => state.user.user);
	const userId = user?.id;
	// const modalState = useAppSelector((state) => state.modal);
	// useEffect(() => {
	// 	console.log('전체 모달 상태:', modalState);
	// }, [modalState]);

	const isAdmin = useIsAdmin();

	// 년, 월 초기 설정
	useEffect(() => {
		const year = selectedDate.getFullYear();
		const month = selectedDate.getMonth() + 1;
		dispatch(setYear(year));
		dispatch(setMonth(month));
	}, []);

	// supabase에서 스케줄 가져오기
	useFiltereSchedulesByCategory({ isAdmin, userId, filterCategoryKey });

	// 클릭한 날짜 필터링
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));
	};

	// 년, 월 바뀌면 전역 상태에 저장
	const handleMonthChange = ({ activeStartDate }) => {
		const year = activeStartDate.getFullYear();
		const month = activeStartDate.getMonth() + 1;
		dispatch(setYear(year));
		dispatch(setMonth(month));
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
			.slice(0, 3);
		return daySchedules.length > 0 ? (
			<>
				{daySchedules.map((s: TSchedule) => (
					<S.ScheduleBar key={s.schedule_id} $category={s.category}>
						{isAdmin
							? SCHEDULE_CATEGORY_LABELS[s.category] && s.user_name
							: SCHEDULE_CATEGORY_LABELS[s.category]}
					</S.ScheduleBar>
				))}
			</>
		) : null;
	};

	return (
		<S.CalenderWrapper $isManagementPage={isManagementPage ?? false}>
			<S.StyledCalendar
				locale="ko-KR"
				onActiveStartDateChange={handleMonthChange}
				onClickDay={handleDateClick}
				value={selectedDate}
				view="month"
				formatDay={formatCalendarDay}
				calendarType="gregory" /* 일요일부터 시작 */
				prev2Label={null} /* 년 단위 이동 없앰 */
				next2Label={null} /* 년 단위 이동 없앰 */
				tileContent={tileContent}
				$isManagementPage={isManagementPage ?? false}
			/>
		</S.CalenderWrapper>
	);
};
