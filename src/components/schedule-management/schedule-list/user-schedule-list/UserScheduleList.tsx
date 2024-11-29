import * as S from './UserScheduleList.styles';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { UserScheduleCard } from '../../schedule-card/UserScheduleCard';
import { formatToKoreanDate, toDate } from '@/utils/dateFormatter';
// import ModalPortal from '../../../modal/ModalPortal';
// import ScheduleModal from '../../../modal/ScheduleModal';
import { addScheduleToFirestore } from '@/redux/actions/scheduleActions';
import { TSchedule } from '@/types/schedule';
import { ScheduleAddButton } from '../../schedule-add-button/ScheduleAddButton';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { v4 as uuidv4 } from 'uuid';

export const UserScheduleList = () => {
	const dispatch = useAppDispatch();
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);

	// 임시 데이터
	const addScheduleFields: TSchedule = {
		schedule_id: uuidv4(),
		category: '플로어',
		start_date_time: new Date('2024-11-20T15:00:00.000Z'),
		time: '4',
		repeat: '매주',
		repeat_end_date: new Date('2024-11-31T00:00:00.000Z'),
		description: '의자 밑 팝콘 잘 확인!!!',
		created_at: new Date(),
	};
	const handleScheduleAddButtonClick = async () => {
		const newSchedules = generateRepeatingSchedules(addScheduleFields); // 받은 데이터로 반복 배열 계산하고(배열로 사용할 거라 반복 안되도 무조건 넣어야 함)
		const addResult = await dispatch(addScheduleToFirestore('user1', newSchedules));
		if (!addResult.success) {
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
	);
};
