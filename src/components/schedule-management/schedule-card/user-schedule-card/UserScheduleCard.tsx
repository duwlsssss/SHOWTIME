import * as S from './UserScheduleCard.styles';
import { TUserScheduleCardProps, SCHEDULE_CATEGORY_LABELS, TSchedule } from '@/types/schedule';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useScheduleManage from '@/hooks/useScheduleManage';
import { setSelectedSchedule, setfilterCategory } from '@/redux/actions/scheduleActions';
import {
	setIsScheduleEditModalOpen,
	setIsScheduleDeleteModalOpen,
} from '@/redux/actions/modalActions';
import { isSameDay, formatTime } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';

export const UserScheduleCard = ({ schedule, shouldShowTime }: TUserScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const user = useAppSelector((state) => state.user.user);
	const userId = user?.id;

	const { handleDeleteSchedule } = useScheduleManage(userId ?? null, schedules);

	// 넘어가는 날짜 원 처리용
	const compareDate = new Date(selectedDate);
	const startDate = new Date(schedule.start_date_time);
	const endDate = new Date(schedule.end_date_time);

	const showStartTime = isSameDay(compareDate, startDate);
	const showEndTime = isSameDay(compareDate, endDate);

	const startTime = formatTime(startDate);
	const endTime = formatTime(endDate);

	const handleEditIconClick = (schedule: TSchedule) => {
		dispatch(setSelectedSchedule(schedule));
		dispatch(setIsScheduleEditModalOpen(true));
		dispatch(setfilterCategory('')); // 카테고리 필터 해제
	};

	const handleDeleteIconClick = async (schedule: TSchedule) => {
		const repeatedSchedules = filteredRepeatSchedules(schedule, schedules);
		const isRecurring = repeatedSchedules.length > 1;

		if (isRecurring) {
			// 반복되는 스케줄이 있으면
			dispatch(setSelectedSchedule(schedule));
			dispatch(setIsScheduleDeleteModalOpen(true));
		} else {
			await handleDeleteSchedule(schedule, false); // 하나면 그냥 삭제
		}
		dispatch(setfilterCategory('')); // 카테고리 필터 해제
	};

	return (
		<>
			<S.ScheduleCardContainer>
				<S.TimeContainerUp>
					{showStartTime ? (
						<S.TimeDot $category={schedule.category} />
					) : (
						<S.TimeDotEmpty $category={schedule.category} />
					)}
					<S.TimeButtonWrapper>
						<S.TimeText>
							{startTime}
							{shouldShowTime ? ` - ${endTime}` : ''}
						</S.TimeText>
						<S.ButtonContainer>
							<S.EditIcon onClick={() => handleEditIconClick(schedule)} />
							<S.DeleteIcon onClick={() => handleDeleteIconClick(schedule)} />
						</S.ButtonContainer>
					</S.TimeButtonWrapper>
				</S.TimeContainerUp>
				<S.ContentContainer>
					<S.CategoryText>{SCHEDULE_CATEGORY_LABELS[schedule.category]}</S.CategoryText>
					<S.DescriptionText>{schedule.description}</S.DescriptionText>
				</S.ContentContainer>
				<S.TimeContainerDown>
					{showEndTime ? (
						<S.TimeDotDown $category={schedule.category} />
					) : (
						<S.TimeDotEmptyDown $category={schedule.category} />
					)}
					<S.TimeTextDown>{endTime}</S.TimeTextDown>
				</S.TimeContainerDown>
			</S.ScheduleCardContainer>
		</>
	);
};
