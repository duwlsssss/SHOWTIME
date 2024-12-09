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
import { setIsScheduleEditModalOpen } from '@/redux/actions/modalActions';
import { useAppSelector } from '@/hooks/useRedux';
import ScheduleModal from '../../schedule-modal/ScheduleModal';

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

	return (
		<>
			<S.ScheduleCardContainer $category={schedulesItem.category} id={schedulesItem.user_id}>
				<S.ScheduleCardHeader>
					<span>{schedulesItem.user_name}</span>
					<span>{schedulesItem.user_alias}</span>
					<S.ScheduleCardHeaderIcon>
						<S.EditIcon onClick={() => handleEditSchulde(schedulesItem)} />
						<S.DeleteIcon />
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
		</>
	);
};

export default AdminScheduleCard;
