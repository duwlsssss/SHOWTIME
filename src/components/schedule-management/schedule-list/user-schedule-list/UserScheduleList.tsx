import * as S from './UserScheduleList.styles';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { UserScheduleCard } from '../../schedule-card/UserScheduleCard';
import { formatToKoreanDate, toDate } from '@/utils/dateFormatter';
import ScheduleModal from '../../schedule-modal/ScheduleModal';
import { addScheduleToFirestore, setIsScheduleModalOpen } from '@/redux/actions/scheduleActions';
import { TSchedule } from '@/types/schedule';
import { ScheduleAddButton } from '../../schedule-add-button/ScheduleAddButton';
import { auth } from '@/firebaseConfig';

export const UserScheduleList = () => {
	const dispatch = useAppDispatch();
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);
	const isScheduleModalOpen = useAppSelector((state) => state.schedule.isScheduleModalOpen);

	const handleScheduleAddButtonClick = async () => {
		dispatch(setIsScheduleModalOpen(true));
	};

	const handleSubmit = async (schedules: TSchedule[]) => {
		const userId = auth.currentUser?.uid;
		if (!userId) return;

		const addResult = await dispatch(addScheduleToFirestore(userId, schedules));
		if (addResult.success) {
			dispatch(setIsScheduleModalOpen(false));
		} else {
			console.error('firestore에 스케줄 추가 실패:', addResult.message);
		}
	};

	// 이전 스케줄의 end_date_time과 현재 스케줄의 start_date_time 비교해 ui 설정
	const getTimeDisplay = (index: number) => {
		// 마지막 요소면 무조건 false 반환
		const isLastItem = index === filteredSchedules.length - 1;
		if (isLastItem) {
			return false;
		}

		const currentStartTime = String(toDate(filteredSchedules[index].start_date_time)).slice(16, 21);
		const prevSchedule = index > 0 ? filteredSchedules[index - 1] : null;
		const prevEndTime = prevSchedule?.end_date_time
			? String(toDate(prevSchedule.end_date_time)).slice(16, 21)
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
							<S.DateText>{formatToKoreanDate(selectedDate as Date)}</S.DateText> 의 업무
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
					onClick={() => {
						handleScheduleAddButtonClick();
					}}
				/>
			</S.ScheduleListContainer>
			{isScheduleModalOpen && (
				<ScheduleModal
					type="scheduleUser"
					mode="add"
					onSubmit={handleSubmit}
					onClose={() => dispatch(setIsScheduleModalOpen(false))}
				/>
			)}
		</>
	);
};
