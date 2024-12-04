import * as S from './UserScheduleCard.styles';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
import { isSameDay, formatTime } from '@/utils/dateFormatter';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
	addScheduleToSupabase,
	editScheduleToSupabase,
	removeScheduleFromSupabase,
	// setIsModalOpen,
} from '@/redux/actions/scheduleActions';
import { UserScheduleCardProps, SCHEDULE_CATEGORY_LABELS, TSchedule } from '@/types/schedule';
// import ScheduleModal from '../schedule-modal/ScheduleModal';
// import ModalPortal from '../../modal/ModalPortal';
// import { Modal } from '../../modal/Modal';
import { v4 as uuidv4 } from 'uuid';

export const UserScheduleCard = ({ schedule, shouldShowTime }: UserScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const user = useAppSelector((state) => state.user.user);
	// const isModalOpen = useAppSelector((state) => state.schedule.isModalOpen);

	const userId = user?.id;

	// 임시 데이터
	const updatedFields: Partial<TSchedule> = {
		category: 'floor',
		start_date_time: new Date(),
		time: '3',
		description: '대청소ㅜㅠㅜㅠ',
		created_at: new Date(),
	};

	// const handleSubmit = async (schedules: TSchedule[]) => {
	//   if (!userId) return;

	//   } else {
	//     console.error('firestore에 스케줄 수정 실패:', addResult.message);
	//   }
	// };

	const handleEditScheduleClick = async (
		schedule: TSchedule,
		updatedFields: Partial<TSchedule>,
		editAll: boolean,
	) => {
		if (editAll) {
			try {
				// 전체 삭제 선택시 반복 스케줄들 모두 삭제 후 수정
				// 기존 스케줄 삭제부터 함
				const schedulesToDelete = filteredRepeatSchedules(schedule, schedules);
				const scheduleIdsToDelete = schedulesToDelete.map((s) => s.schedule_id);

				// Supabase 삭제
				const supabaseDeleteResult = await dispatch(
					removeScheduleFromSupabase(userId!, scheduleIdsToDelete),
				);

				if (!supabaseDeleteResult.success) {
					console.error('전체 수정 전 삭제 실패');
					return;
				}

				const updatedSchedules = generateRepeatingSchedules({
					...schedule,
					...updatedFields,
					schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성해줌
				});

				const supabaseAddResult = await dispatch(addScheduleToSupabase(userId!, updatedSchedules));

				if (!supabaseAddResult.success) {
					console.error('전체 수정 중 추가 실패');
					return;
				}
				console.log('전체 스케줄이 성공적으로 수정됨');
			} catch (error) {
				console.error('스케줄 수정 실패', error);
			}
		} else {
			try {
				const supabaseDeleteResult = await dispatch(
					removeScheduleFromSupabase(userId!, [schedule.schedule_id]),
				);

				if (!supabaseDeleteResult.success) {
					console.error('단일 수정 전 삭제 실패');
					return;
				}
				// 단일 스케줄 수정시에도 repeat, repeat_end_date (반복 설정) 있으면 반복 배열 추가
				const hasRepeat = updatedFields.repeat && updatedFields.repeat_end_date;
				if (hasRepeat) {
					// 반복 배열 생성, 추가
					const updatedSchedules = generateRepeatingSchedules({
						...schedule,
						...updatedFields,
						schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성
					});

					const supabaseAddResult = await dispatch(
						addScheduleToSupabase(userId!, updatedSchedules),
					);

					if (!supabaseAddResult.success) {
						console.error('단일 스케줄 수정이 반복 스케줄로 수정 실패');
						return;
					}
					console.log('단일 스케줄 수정이 반복 스케줄로 성공적으로 수정됨');
				} else {
					const updatedSchedule = {
						...schedule,
						...updatedFields,
					};

					const supabaseEditResult = await dispatch(
						editScheduleToSupabase(userId!, [updatedSchedule]),
					);

					if (!supabaseEditResult.success) {
						console.error('단일 스케줄 수정 실패');
						return;
					}
					console.log('단일 스케줄이 성공적으로 수정됨');
				}
			} catch (error) {
				console.error('스케줄 수정 실패', error);
			}
		}
	};

	const handleDeleteScheduleClick = async (schedule: TSchedule, deleteAll: boolean) => {
		try {
			if (deleteAll) {
				const filteredS = filteredRepeatSchedules(schedule, schedules);
				const scheduleIdsToDelete = filteredS.map((s) => s.schedule_id);

				const supabaseDeleteResult = await dispatch(
					removeScheduleFromSupabase(userId!, scheduleIdsToDelete),
				);

				if (!supabaseDeleteResult.success) {
					console.error('삭제 실패');
					return;
				}
				console.log('모든 반복 스케줄이 성공적으로 삭제됨');
			} else {
				// 단일 스케줄 삭제
				console.log('schedule.schedule_id:', [schedule.schedule_id]);
				const deleteResult = await dispatch(
					removeScheduleFromSupabase(userId!, [schedule.schedule_id]),
				);
				if (!deleteResult.success) {
					console.error('단일 삭제 실패:', deleteResult.message);
					return;
				}
				console.log('단일 스케줄이 성공적으로 삭제됨');
			}
		} catch (error) {
			console.error('스케줄 삭제 실패:', error);
		}
	};

	// 넘어가는 날짜 원 처리용
	const compareDate = new Date(selectedDate);
	const startDate = new Date(schedule.start_date_time);
	const endDate = new Date(schedule.end_date_time);

	const showStartTime = isSameDay(compareDate, startDate);
	const showEndTime = isSameDay(compareDate, endDate);

	const startTime = formatTime(startDate);
	const endTime = formatTime(endDate);

	return (
		<>
			<S.ScheduleCardContainer>
				<S.TimeContainerUp>
					{showStartTime ? (
						<S.TimeDot $category={schedule.category} />
					) : (
						<S.TimeDotEmpty $category={schedule.category} />
					)}
					<S.TimeText>
						{startTime}
						{shouldShowTime ? ` - ${endTime}` : ''}
					</S.TimeText>
					<S.ButtonContainer>
						<S.EditIcon
							onClick={() => {
								handleEditScheduleClick(schedule, updatedFields, true);
							}}
						/>
						<S.DeleteIcon
							onClick={() => {
								handleDeleteScheduleClick(schedule, false);
							}}
						/>
					</S.ButtonContainer>
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
			{/* { isModalOpen && (
				<ScheduleModal
					type="scheduleUser"
					mode='edit'
					onSubmit={handleSubmit}
					onClose={() => dispatch(setIsModalOpen(false))}
				/>
			)} */}
		</>
	);
};
