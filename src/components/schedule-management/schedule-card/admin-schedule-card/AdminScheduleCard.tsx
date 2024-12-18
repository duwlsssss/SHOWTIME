import * as S from './AdminScheduleCard.styles';
import { TSchedule, TAdminScheduleCardProps, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useScheduleManage from '@/hooks/useScheduleManage';
import { setSelectedSchedule, setfilterCategory } from '@/redux/actions/scheduleActions';
import {
	setIsScheduleEditModalOpen,
	setIsScheduleDeleteModalOpen,
} from '@/redux/actions/modalActions';
import { isSameDate, formatTime } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';

const AdminScheduleCard = ({ schedule }: TAdminScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	const { handleDeleteSchedule, readLoading } = useScheduleManage(
		schedule.user_id ?? '',
		schedules,
	);

	readLoading();

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

	// 전 날과 이어지는 스케줄인지 체크
	const compareDate = new Date(selectedDate);
	const startDate = new Date(schedule.start_date_time);
	const isYesterdaySchedule = !isSameDate(compareDate, startDate);

	const hasDescription = !!schedule.description;

	return (
		<S.ScheduleCardContainer $category={schedule.category}>
			{isYesterdaySchedule && (
				<S.YesterdayScheduleText>전 날과 이어지는 스케줄이에요</S.YesterdayScheduleText>
			)}
			<S.ScheduleCardHeader>
				<S.UserInfo>
					<S.UserName>{schedule.user_name}</S.UserName>
					<S.UserAlias>{schedule.user_alias}</S.UserAlias>
				</S.UserInfo>
				<S.ButtonContainer>
					<S.EditIcon onClick={() => handleEditSchulde(schedule)} />
					<S.DeleteIcon onClick={() => handleDeleteIconClick(schedule)} />
				</S.ButtonContainer>
			</S.ScheduleCardHeader>
			<S.ScheduleCardMain>
				<S.ScheduleCategory>{SCHEDULE_CATEGORY_LABELS[schedule.category]}</S.ScheduleCategory>
				<S.ScheduleTime>
					{formatTime(new Date(schedule.start_date_time))} -{' '}
					{formatTime(new Date(schedule.end_date_time))}
				</S.ScheduleTime>
			</S.ScheduleCardMain>
			{hasDescription && <S.ScheduleDescription>{schedule.description}</S.ScheduleDescription>}
		</S.ScheduleCardContainer>
	);
};

export default AdminScheduleCard;
