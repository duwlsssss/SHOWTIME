import * as S from './Calendar.styles';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
	fetchSchedulesFromFirestore,
	addScheduleToFirestore,
	selectDate,
	filteredSchedules,
} from '@/redux/actions/scheduleActions';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { TSchedule } from '@/types/schedule';
import { toDate } from '@/utils/generateRepeatingSchedules';

interface CalendarComponentProps {
	isManagementPage?: boolean;
	state?: 'admin' | 'user';
}
export const CalendarComponent = ({ isManagementPage, state }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	console.log('Schedules:', schedules); // 디버깅용
	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
		console.log('state:', state);
	}, [isManagementPage, state]);

	const hasFetched = useRef(false); // strictmode 대비해 한번만 실행되도록 하는 플래그

	useEffect(() => {
		dispatch(fetchSchedulesFromFirestore('user1'));

		// 오늘 날짜를 기본으로 설정
		const today = new Date();
		dispatch(selectDate(today));

		const todaySchedules = schedules.filter(
			(schedule) =>
				toDate(schedule.start_time).toDateString() === today.toDateString() ||
				(schedule.end_time
					? toDate(schedule.end_time).toDateString() === today.toDateString()
					: true),
		);

		dispatch(filteredSchedules(todaySchedules));
		hasFetched.current = true; // 중복 실행 방지
	}, [dispatch]);

	// 날짜 선택시 그 날짜, 그 날짜의 스케줄 필터링해서 전역 상태에 저장
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));

		const filteredS = schedules.filter(
			(schedule) =>
				toDate(schedule.start_time).toDateString() === date.toDateString() ||
				(schedule.end_time
					? toDate(schedule.end_time).toDateString() === date.toDateString()
					: true),
		);

		console.log('filteredS:', filteredS);

		dispatch(filteredSchedules(filteredS));
	};

	const schedule: TSchedule = {
		schedule_id: uuidv4(), // 초기 스케줄 ID
		user_id: 'user1',
		category: '플로어',
		start_time: new Date('2024-11-27T22:00:00.000Z'),
		time: '5',
		repeat: '매일',
		repeat_end_date: new Date('2024-11-30T00:00:00.000Z'),
		description: '매점 운영',
		created_at: new Date(),
	};

	const handleAddSchedule = () => {
		const newSchedules = generateRepeatingSchedules(schedule);
		dispatch(addScheduleToFirestore('user1', newSchedules));
	};

	// 날짜 포맷 (숫자만)
	const formatCalendarDay = (locale: string | undefined, date: Date): string => {
		const day = date.getDate();
		return day < 10 ? `0${day}` : `${day}`;
	};

	// 일정 있는 날짜에 바 표시
	const tileContent = ({ date }: { date: Date }) => {
		const daySchedules = schedules
			.filter((schedule) => toDate(schedule.start_time).toDateString() === date.toDateString())
			.sort(
				(a, b) =>
					toDate(a.start_time).getTime() - toDate(b.start_time).getTime() ||
					toDate(a.created_at).getTime() - toDate(b.created_at).getTime(),
			)
			.slice(0, 2);
		return daySchedules.length > 0 ? (
			<>
				{daySchedules.map((s: TSchedule) => (
					<S.ScheduleBar key={s.schedule_id} $category={s.category}>
						{s.category}
					</S.ScheduleBar>
				))}
			</>
		) : null;
	};

	return (
		<S.CalenderContainer>
			<div className="calener-category">카테고리 체크</div>
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
			<button onClick={handleAddSchedule}>일정 추가</button>
		</S.CalenderContainer>
	);
};
