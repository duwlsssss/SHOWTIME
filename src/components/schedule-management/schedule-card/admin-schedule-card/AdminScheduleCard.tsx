import {
	TDate,
	TSchedule,
	TScheduleCategory,
	TScheduleRepeatCycle,
	TScheduleShiftType,
} from '@/types/schedule';
import * as S from './AdminScheduleCard.styles';
import { formatTime } from '@/utils/dateFormatter';
import { setSelectedSchedule } from '@/redux/actions/scheduleActions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useRedux';
import ScheduleModal from '../../schedule-modal/ScheduleModal';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
import {
	setIsScheduleEditModalOpen,
	setIsScheduleDeleteModalOpen,
} from '@/redux/actions/modalActions';
import useScheduleManage from '@/hooks/useScheduleManage';
import ModalPortal from '@/components/modal/ModalPortal';
import { ConfirmModal } from '@/components/modal/Modal';

interface AdminScheduleCardProps {
	schedulesItem: {
		schedule_id: string;
		user_id?: string;
		user_name: string;
		user_alias: string;
		category: TScheduleCategory;
		start_date_time: TDate;
		time: string;
		end_date_time: TDate; // 계산된 종료 시간
		schedule_shift_type: TScheduleShiftType; // 계산된 오픈, 미들, 마감
		repeat?: TScheduleRepeatCycle;
		repeat_end_date?: TDate;
		created_at: TDate;
		description?: string;
	};
}

const AdminScheduleCard = ({ schedulesItem }: AdminScheduleCardProps) => {
	const dispatch = useDispatch();
	const isScheduleEditModalOpen = useAppSelector((state) => state.modal.isScheduleEditModalOpen);
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const isScheduleDeleteModalOpen = useAppSelector(
		(state) => state.modal.isScheduleDeleteModalOpen,
	);
	const selectedSchedule = useAppSelector((state) => state.schedule.selectedSchedule);

	const { handleDeleteSchedule } = useScheduleManage(schedulesItem.user_id ?? '', schedules);

	const categoryConvert = (schedulesCategory) => {
		switch (schedulesCategory) {
			case 'floor':
				return '플로어';
				break;
			case 'snack':
				return '매점';
				break;
			case 'ticket':
				return '매표';
				break;
		}
	};

	const handleEditSchulde = (schedule: TSchedule) => {
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
					<span>{categoryConvert(schedulesItem.category)}</span>
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
