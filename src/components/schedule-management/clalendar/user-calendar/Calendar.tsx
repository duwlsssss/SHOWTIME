import * as S from '../Calendar.styles';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { getSchedules, selectDate, filteredSchedules } from '@/redux/actions/scheduleActions';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';
import { formatCalendarDay } from '@/utils/dateFormatter';
import { TSchedule, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { toDate } from '@/utils/dateFormatter';
import { db } from '@/firebaseConfig';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth } from '@/firebaseConfig';
import { Timestamp } from 'firebase/firestore';

interface CalendarComponentProps {
	isManagementPage?: boolean;
}
export const CalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	const userId = auth.currentUser?.uid;
	// console.log('userId:', userId);

	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
	}, [isManagementPage]);

	// Firestore에서 스케줄 가져오기 - 무한 렌더링 막기 위해 Firestore의 실시간 리스너 사용
	useEffect(() => {
		if (!userId) {
			// userId가 없으면 빈 배열로 초기화
			dispatch(getSchedules([]));
			return;
		}

		const userDocRef = doc(db, 'schedules', userId);

		const unsubscribe = onSnapshot(userDocRef, (doc) => {
			if (doc.exists()) {
				const schedules = doc.data().schedules || [];
				dispatch(getSchedules(schedules));
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	// 오늘 날짜(초기) 필터링
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

		// console.log('filteredS:', filteredS); // 디버깅용

		dispatch(filteredSchedules(filteredS));
	};

	// 일정 있는 날짜에 바 표시
	const tileContent = ({ date }: { date: Date }) => {
		const daySchedules = schedules
			.filter((schedule) => {
				const scheduleDate =
					schedule.start_date_time instanceof Timestamp
						? schedule.start_date_time.toDate()
						: new Date(schedule.start_date_time);
				return scheduleDate.toDateString() === date.toDateString();
			})
			.sort((a, b) => {
				const aDate =
					a.start_date_time instanceof Timestamp
						? a.start_date_time.toDate()
						: new Date(a.start_date_time);
				const bDate =
					b.start_date_time instanceof Timestamp
						? b.start_date_time.toDate()
						: new Date(b.start_date_time);
				return aDate.getTime() - bDate.getTime();
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
