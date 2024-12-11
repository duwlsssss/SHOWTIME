import * as S from './UserScheduleList.styles';
import { UserScheduleCard } from '../../schedule-card/user-schedule-card/UserScheduleCard';
import { ScheduleAddButton } from '../../schedule-add-button/ScheduleAddButton';
import { ScheduleModal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setIsScheduleAddModalOpen } from '@/redux/actions/modalActions';
import { formatToKoreanDate, formatTime } from '@/utils/dateFormatter';

export const UserScheduleList = () => {
	const dispatch = useAppDispatch();
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);
	const isScheduleAddModalOpen = useAppSelector((state) => state.modal.isScheduleAddModalOpen);

	// console.log('filteredSchedules in userList',filteredSchedules)

	// 이전 스케줄의 end_date_time과 현재 스케줄의 start_date_time 비교해 ui 설정
	const getTimeDisplay = (index: number) => {
		// 마지막 요소면 무조건 false 반환
		const isLastItem = index === filteredSchedules.length - 1;
		if (isLastItem) {
			return false;
		}

		const currentStartTime = formatTime(new Date(filteredSchedules[index].start_date_time));

		const prevSchedule = index > 0 ? filteredSchedules[index - 1] : null;
		const prevEndTime = prevSchedule?.end_date_time
			? formatTime(new Date(prevSchedule.end_date_time))
			: null;

		const shouldShowTime = !prevEndTime || prevEndTime !== currentStartTime;
		return shouldShowTime; // 시간 2개 표시(-) 여부
	};

	return (
		<>
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
					filteredSchedules.map((schedule, index) => (
						<UserScheduleCard
							key={schedule.schedule_id}
							schedule={schedule}
							shouldShowTime={getTimeDisplay(index)}
						/>
					))
				) : (
					<S.EmptyScheduleText>오늘은 쉬는 날 😊</S.EmptyScheduleText>
				)}
				<ScheduleAddButton
					className="schedule-add-button"
					onClick={() => dispatch(setIsScheduleAddModalOpen(true))}
				/>
			</S.ScheduleListContainer>
			{isScheduleAddModalOpen && <ScheduleModal type="scheduleUser" mode="add" />}
		</>
	);
};
