import * as S from './UserScheduleCard.styles';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toDate } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
// import ScheduleModal from '../schedule-modal/ScheduleModal';
import {
	addScheduleToFirestore,
	editScheduleToFirestore,
	removeScheduleToFirestore,
	// setIsScheduleModalOpen,
} from '@/redux/actions/scheduleActions';
import { SCHEDULE_CATEGORY_LABELS, TSchedule } from '@/types/schedule';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { Timestamp } from 'firebase/firestore';
import { auth } from '@/firebaseConfig';
import { removeScheduleFromSupabase } from '@/redux/actions/scheduleActions';
import { addScheduleToSupabase, editScheduleToSupabase } from '@/redux/actions/scheduleActions';

interface UserScheduleCardProps {
	schedule: TSchedule;
	shouldShowTime: boolean;
}

export const UserScheduleCard = ({ schedule, shouldShowTime }: UserScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	// const isScheduleModalOpen = useAppSelector((state) => state.schedule.isScheduleModalOpen);

	const userId = auth.currentUser?.uid;
	// 임시 데이터
	const updatedFields: Partial<TSchedule> = {
		category: 'floor',
		start_date_time: new Date('2024-11-27T22:00:00.000Z'),
		time: '3',
		repeat: 'everyDay',
		repeat_end_date: new Date('2024-11-29T00:00:00.000Z'),
		description: '대청소ㅜㅠㅜㅠ',
		created_at: new Date(),
	};

	// const handleSubmit = async (schedules: TSchedule[]) => {
	//   const userId = auth.currentUser?.uid;
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

				// Firebase 삭제
				const firebaseDeleteResult = await dispatch(
					removeScheduleToFirestore(userId, scheduleIdsToDelete),
				);
				// Supabase 삭제
				const supabaseDeleteResult = await dispatch(
					removeScheduleFromSupabase(userId!, scheduleIdsToDelete),
				);

				if (!firebaseDeleteResult.success || !supabaseDeleteResult.success) {
					console.error('전체 수정 전 삭제 실패');
					return;
				}

				const updatedSchedules = generateRepeatingSchedules({
					...schedule,
					...updatedFields,
				});

				// Firebase와 Supabase에 추가
				const firebaseAddResult = await dispatch(addScheduleToFirestore(userId, updatedSchedules));
				const supabaseAddResult = await dispatch(addScheduleToSupabase(userId!, updatedSchedules));

				if (!firebaseAddResult.success || !supabaseAddResult.success) {
					console.error('전체 수정 중 추가 실패');
					return;
				}
				console.log('전체 스케줄이 성공적으로 수정됨');
			} catch (error) {
				console.error('스케줄 수정 실패', error);
			}
		} else {
			try {
				// Firebase와 Supabase 삭제
				const firebaseDeleteResult = await dispatch(
					removeScheduleToFirestore(userId, [schedule.schedule_id]),
				);
				const supabaseDeleteResult = await dispatch(
					removeScheduleFromSupabase(userId!, [schedule.schedule_id]),
				);

				if (!firebaseDeleteResult.success || !supabaseDeleteResult.success) {
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
					});

					// Firebase와 Supabase에 추가
					const firebaseAddResult = await dispatch(
						addScheduleToFirestore(userId, updatedSchedules),
					);
					const supabaseAddResult = await dispatch(
						addScheduleToSupabase(userId!, updatedSchedules),
					);

					if (!firebaseAddResult.success || !supabaseAddResult.success) {
						console.error('단일 스케줄 수정이 반복 스케줄로 수정 실패');
						return;
					}
					console.log('단일 스케줄 수정이 반복 스케줄로 성공적으로 수정됨');
				} else {
					const updatedSchedule = {
						...schedule,
						...updatedFields,
					};

					// Firebase와 Supabase 수정
					const firebaseEditResult = await dispatch(
						editScheduleToFirestore(userId, [updatedSchedule]),
					);
					const supabaseEditResult = await dispatch(
						editScheduleToSupabase(userId!, [updatedSchedule]),
					);

					if (!firebaseEditResult.success || !supabaseEditResult.success) {
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

				// Firebase 삭제
				const firebaseResult = await dispatch(
					removeScheduleToFirestore(userId, scheduleIdsToDelete),
				);
				// Supabase 삭제 추가
				const supabaseResult = await dispatch(
					removeScheduleFromSupabase(userId!, scheduleIdsToDelete),
				);

				if (!firebaseResult.success || !supabaseResult.success) {
					console.error('삭제 실패');
					return;
				}
				console.log('모든 반복 스케줄이 성공적으로 삭제됨');
			} else {
				// 단일 스케줄 삭제
				console.log('schedule.schedule_id:', [schedule.schedule_id]);
				const deleteResult = await dispatch(
					removeScheduleToFirestore(userId, [schedule.schedule_id]),
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
	const isSameDate = (date1: Date | Timestamp, date2: Date | Timestamp) => {
		if (!date1 || !date2) return false;
		return toDate(date1).toLocaleDateString() === toDate(date2).toLocaleDateString();
	};
	const showStartTime = isSameDate(selectedDate, schedule.start_date_time);
	let showEndTime = false;
	if (schedule.end_date_time) {
		showEndTime = isSameDate(selectedDate, schedule.end_date_time);
	}

	const startTime = String(toDate(schedule.start_date_time)).slice(16, 21);
	const endTime = schedule.end_date_time
		? String(toDate(schedule.end_date_time)).slice(16, 21)
		: null;

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
								handleEditScheduleClick(schedule, updatedFields, false);
							}}
						/>
						<S.DeleteIcon
							onClick={() => {
								handleDeleteScheduleClick(schedule, true);
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
			{/* {isScheduleModalOpen && (
				<ScheduleModal
					type="scheduleUser"
					mode='edit'
					onSubmit={handleSubmit}
					onClose={() => dispatch(setIsScheduleModalOpen(false))}
				/>
			)} */}
		</>
	);
};
