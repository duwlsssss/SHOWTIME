import * as S from './AdminScheduleCard.styles';
import { TSchedule, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { ScheduleModal, ModalPortal, ConfirmModal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useScheduleManage from '@/hooks/useScheduleManage';
import { setSelectedSchedule, setfilterCategory } from '@/redux/actions/scheduleActions';
import {
	setIsScheduleEditModalOpen,
	setIsScheduleDeleteModalOpen,
} from '@/redux/actions/modalActions';
import { formatTime } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';

interface AdminScheduleCardProps {
	schedulesItem: TSchedule;
}

const AdminScheduleCard = ({ schedulesItem }: AdminScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const isScheduleEditModalOpen = useAppSelector((state) => state.modal.isScheduleEditModalOpen);
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const isScheduleDeleteModalOpen = useAppSelector(
		(state) => state.modal.isScheduleDeleteModalOpen,
	);
	const selectedSchedule = useAppSelector((state) => state.schedule.selectedSchedule);

	const { handleDeleteSchedule } = useScheduleManage(schedulesItem.user_id ?? '', schedules);

	const handleEditSchulde = (schedule: TSchedule) => {
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
			<S.ScheduleCardContainer $category={schedulesItem.category} id={schedulesItem.user_id}>
				<S.ScheduleCardHeader>
					<span>{schedulesItem.user_name}</span>
					<span>{schedulesItem.user_alias}</span>
					<S.ScheduleCardHeaderIcon>
						<S.EditIcon onClick={() => handleEditSchulde(schedulesItem)} />
						<S.DeleteIcon onClick={() => handleDeleteIconClick(schedulesItem)} />
					</S.ScheduleCardHeaderIcon>
				</S.ScheduleCardHeader>
				<div>
					<span>{SCHEDULE_CATEGORY_LABELS[schedulesItem.category]}</span>
				</div>
				<S.ScheduleCardTime>
					<span>{formatTime(new Date(schedulesItem.end_date_time))}</span>
				</S.ScheduleCardTime>
				<div>
					<span>{schedulesItem.description}</span>
				</div>
			</S.ScheduleCardContainer>
			{isScheduleEditModalOpen && (
				<ScheduleModal type="scheduleUser" mode="edit" adminUserId={schedulesItem.user_id} />
			)}
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

export default AdminScheduleCard;
