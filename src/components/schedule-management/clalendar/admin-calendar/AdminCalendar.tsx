import * as S from '../Calendar.styles';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { selectDate, filteredSchedules } from '@/redux/actions/scheduleActions';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';
import { formatCalendarDay } from '@/utils/dateFormatter';
import { TSchedule } from '@/types/schedule';
import { toDate } from '@/utils/dateFormatter';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface CalendarComponentProps {
	isManagementPage?: boolean;
}

export const AdminCalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
	}, [isManagementPage]);

	const getSchedules = async () => {
		try {
			const schedulesCollection = collection(db, 'schedules'); // "schedules" 컬렉션 참조
			const querySnapshot = await getDocs(schedulesCollection); // 모든 문서 가져오기

			const schedules = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				dispatch({
					type: 'ADMIN_GET_SCHEDULES',
					payload: data.schedules.map((schedule) => schedule),
				}); // 확인용 로그
			});

			return schedules;
		} catch (error) {
			console.error('Error fetching schedules: ', error);
		}
	};

	useEffect(() => {
		getSchedules();
	}, [dispatch]);

	useEffect(() => {
		if (schedules.length > 0 && selectedDate) {
			const todaySchedules = filterSchedulesByDateAndSort(schedules, selectedDate as Date);
			dispatch(filteredSchedules(todaySchedules));
		}
	}, [dispatch, selectedDate, schedules]);
	// 날짜 선택시 그 날짜, 그 날짜의 스케줄 필터링해서 전역 상태에 저장
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));

		const filteredS = filterSchedulesByDateAndSort(schedules, date);

		console.log('filteredS:', filteredS); // 디버깅용

		dispatch(filteredSchedules(filteredS));
	};

	const tileContent = ({ date }: { date: Date }) => {
		const daySchedules = schedules
			.filter((schedule) => toDate(schedule.start_date_time).toDateString() === date.toDateString())
			.sort(
				(a, b) =>
					toDate(a.start_date_time).getTime() - toDate(b.start_date_time).getTime() ||
					toDate(a.created_at).getTime() - toDate(b.created_at).getTime(),
			);

		return daySchedules.length > 0 ? (
			<>
				{daySchedules.map((s: TSchedule) => (
					<S.ScheduleBar key={s.schedule_id} $category={s.category}>
						{s.user_name}
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
				value={selectedDate as Date}
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
