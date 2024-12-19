import * as S from './ScheduleManagement.styles';
import {
	ScheduleList,
	CalendarComponent,
	CheckboxGroup,
	ScheduleModal,
	ModalPortal,
	ConfirmModal,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useScheduleManage from '@/hooks/useScheduleManage';
import useIsAdmin from '@/hooks/useIsAdmin';
import { setSelectedSchedule } from '@/redux/actions/scheduleActions';
import { setIsScheduleDeleteModalOpen } from '@/redux/actions/modalActions';

export function ScheduleManagement() {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedSchedule = useAppSelector((state) => state.schedule.selectedSchedule);
	const isScheduleEditModalOpen = useAppSelector((state) => state.modal.isScheduleEditModalOpen);
	const isScheduleDeleteModalOpen = useAppSelector(
		(state) => state.modal.isScheduleDeleteModalOpen,
	);
	const isAdmin = useIsAdmin();

	const { handleDeleteSchedule, readLoading } = useScheduleManage(
		selectedSchedule?.user_id ?? '',
		schedules,
	);

	// Suspense에서 상태 확인
	readLoading();

	const handleConfirmDelete = async (deleteAll: boolean) => {
		if (!selectedSchedule) return;

		await handleDeleteSchedule(selectedSchedule, deleteAll);
		dispatch(setIsScheduleDeleteModalOpen(false));
		dispatch(setSelectedSchedule(null)); // 선택된 스케줄 초기화
	};

	return (
		<>
			<S.ScheduleManagementContainer>
				<S.CalenderSection>
					<CheckboxGroup />
					<CalendarComponent isManagementPage={true} />
				</S.CalenderSection>
				<ScheduleList />
			</S.ScheduleManagementContainer>
			{isScheduleEditModalOpen && isAdmin && selectedSchedule && (
				<ScheduleModal type="scheduleAdmin" mode="edit" />
			)}
			{isScheduleEditModalOpen && !isAdmin && selectedSchedule && (
				<ScheduleModal type="scheduleUser" mode="edit" />
			)}
			{isScheduleDeleteModalOpen && selectedSchedule && (
				<ModalPortal>
					<ConfirmModal
						onClose={() => dispatch(setIsScheduleDeleteModalOpen(false))}
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
}
