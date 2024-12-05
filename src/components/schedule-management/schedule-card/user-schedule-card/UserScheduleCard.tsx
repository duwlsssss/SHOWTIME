import * as S from './UserScheduleCard.styles';
import { isSameDay, formatTime } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setSelectedSchedule } from '@/redux/actions/scheduleActions';
import {
	setIsScheduleEditModalOpen,
	setIsScheduleDeleteModalOpen,
} from '@/redux/actions/ModalActions';
import { UserScheduleCardProps, SCHEDULE_CATEGORY_LABELS, TSchedule } from '@/types/schedule';
import useScheduleManage from '@/hooks/useScheduleManage';
import ScheduleModal from '../../schedule-modal/ScheduleModal';
import ModalPortal from '../../../modal/ModalPortal';
import { ConfirmModal } from '../../../modal/Modal';

export const UserScheduleCard = ({ schedule, shouldShowTime }: UserScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const user = useAppSelector((state) => state.user.user);
	const isScheduleEditModalOpen = useAppSelector((state) => state.modal.isScheduleEditModalOpen);
	const isScheduleDeleteModalOpen = useAppSelector(
		(state) => state.modal.isScheduleDeleteModalOpen,
	);
	const selectedSchedule = useAppSelector((state) => state.schedule.selectedSchedule);

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
	};

	const handleConfirmDelete = async (deleteAll: boolean) => {
		try {
			if (!selectedSchedule) return;

			await handleDeleteSchedule(selectedSchedule, deleteAll);
			dispatch(setIsScheduleDeleteModalOpen(false));
			dispatch(setSelectedSchedule(null)); // 선택된 스케줄 초기화
		} catch (error) {
			console.error('스케줄 삭제 실패:', error);
		}
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
			{isScheduleEditModalOpen && <ScheduleModal type="scheduleUser" mode="edit" />}
			{isScheduleDeleteModalOpen && (
				<ModalPortal>
					<ConfirmModal
						onClose={() => {
							dispatch(setIsScheduleDeleteModalOpen(false));
						}}
						message={{
							confirm: '반복되는 일정을 모두 삭제하시겠습니까?',
							leftBtn: '모두 삭제',
							rightBtn: '이 일정만 삭제',
						}}
						color={'red'}
						onClickLeftBtn={() => handleConfirmDelete(true)}
						onClickRightBtn={() => handleConfirmDelete(false)}
					/>
				</ModalPortal>
			)}
		</>
	);
};
