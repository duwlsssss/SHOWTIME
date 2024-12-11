import { useEffect } from 'react';
import * as S from './Calendar.styles';
import { TSchedule, CalendarComponentProps, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import useIsAdmin from '@/hooks/useIsAdmin';
import { getSchedulesFromSupabase, selectDate } from '@/redux/actions/scheduleActions';
import { formatCalendarDay } from '@/utils/dateFormatter';

export const CalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const user = useAppSelector((state) => state.user.user);
	const userId = user?.id;
	// const modalState = useAppSelector((state) => state.modal);
	// useEffect(() => {
	// 	console.log('전체 모달 상태:', modalState);
	// }, [modalState]);

	const isAdmin = useIsAdmin();

	// 디버깅용
	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
	}, [isManagementPage]);

	// supabase에서 스케줄 가져오기
	const init = async () => {
		if (isAdmin) {
			await dispatch(getSchedulesFromSupabase());
		} else {
			if (!userId) throw new Error('userId가 없음');
			await dispatch(getSchedulesFromSupabase(userId));
		}
	};
	useEffect(() => {
		init();
	}, [userId]);

	// 클릭한 날짜 필터링
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));
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
