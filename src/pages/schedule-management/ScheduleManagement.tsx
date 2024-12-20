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

// const onRenderCallback: ProfilerOnRenderCallback = (
// 	id, // 방금 커밋된 Profiler 트리의 "id"
// 	phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
// 	actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
// 	baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
// 	startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
// 	commitTime, // React가 해당 업데이트를 언제 커밋했는지
// 	// interactions,
// ) => {
// 	console.log('[Profiler Info]', {
// 		id,
// 		phase,
// 		actualDuration,
// 		baseDuration,
// 		startTime,
// 		commitTime,
// 		// interactions,
// 	});
// };

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
			{/* <Profiler id="LayoutProfiler" onRender={onRenderCallback}> */}
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
