import * as S from './UserScheduleCard.styles';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toDate } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
// import ModalPortal from '../../../modal/ModalPortal';
// import ScheduleModal from '../../../modal/ScheduleModal';
import {
	addScheduleToFirestore,
	editScheduleToFirestore,
	removeScheduleToFirestore,
} from '@/redux/actions/scheduleActions';
import { TSchedule } from '@/types/schedule';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { Timestamp } from 'firebase/firestore';

interface UserScheduleCardProps {
	schedule: TSchedule;
	shouldShowTime: boolean;
}

export const UserScheduleCard = ({ schedule, shouldShowTime }: UserScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	// 임시 데이터
	const updatedFields: Partial<TSchedule> = {
		category: '플로어',
		start_date_time: new Date('2024-11-27T22:00:00.000Z'),
		time: '3',
		repeat: '매일',
		repeat_end_date: new Date('2024-11-29T00:00:00.000Z'),
		description: '대청소ㅜㅠㅜㅠ',
		created_at: new Date(),
	};

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

				const deleteResult = await dispatch(
					removeScheduleToFirestore('user1', scheduleIdsToDelete),
				);
				if (!deleteResult.success) {
					console.error('전체 수정 전 삭제 실패:', deleteResult.message);
					return;
				}
				// 수정된 내용을 기반으로 새 스케줄 배열 생성
				const updatedSchedules = generateRepeatingSchedules({
					...schedule,
					...updatedFields,
				});
				// 새 스케줄 배열 Firestore에 추가
				const addResult = await dispatch(addScheduleToFirestore('user1', updatedSchedules));
				if (addResult.success) {
					console.log('전체 스케줄이 성공적으로 수정됨');
				} else {
					console.error('전체 수정 중 추가 실패:', addResult.message);
				}
			} catch (error) {
				console.error('firestore에 모든 스케줄 수정 실패', error);
			}
		} else {
			try {
				// 기존 스케줄 삭제
				const deleteResult = await dispatch(
					removeScheduleToFirestore('user1', [schedule.schedule_id]),
				);
				if (!deleteResult.success) {
					console.error('단일 수정 전 삭제 실패:', deleteResult.message);
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
					const addResult = await dispatch(addScheduleToFirestore('user1', updatedSchedules));
					if (addResult.success) {
						console.log('단일 스케줄 수정이 반복 스케줄로 성공적으로 수정됨');
					} else {
						console.error('단일 스케줄 수정이 반복 스케줄로 수정 실패:', addResult.message);
					}
				} else {
					// 반복 설정 없으면 단일 스케줄 수정
					const updatedSchedule = {
						...schedule,
						...updatedFields,
					};
					const editResult = await dispatch(editScheduleToFirestore('user1', [updatedSchedule]));
					if (editResult.success) {
						console.log('단일 스케줄이 단일 스케줄로 성공적으로 수정됨');
					} else {
						console.error('단일 스케줄 수정이 단일 스케줄로 수정 실패:', editResult.message);
					}
				}
			} catch (error) {
				console.error('firestore에 스케줄 하나 수정 실패', error);
			}
		}
	};

	const handleDeleteScheduleClick = async (schedule: TSchedule, deleteAll: boolean) => {
		try {
			if (deleteAll) {
				// 모든 반복 스케줄 삭제
				const filteredS = filteredRepeatSchedules(schedule, schedules);
				const scheduleIdsToDelete = filteredS.map((s) => s.schedule_id);
				console.log('scheduleIdsToDelete:', scheduleIdsToDelete);
				const deleteResult = await dispatch(
					removeScheduleToFirestore('user1', scheduleIdsToDelete),
				);
				if (!deleteResult.success) {
					console.error('전체 삭제 실패:', deleteResult.message);
					return;
				}
				console.log('모든 반복 스케줄이 성공적으로 삭제됨');
			} else {
				// 단일 스케줄 삭제
				console.log('schedule.schedule_id:', [schedule.schedule_id]);
				const deleteResult = await dispatch(
					removeScheduleToFirestore('user1', [schedule.schedule_id]),
				);
				if (!deleteResult.success) {
					console.error('단일 삭제 실패:', deleteResult.message);
					return;
				}
				console.log('단일 스케줄이 성공적으로 삭제됨');
			}
		} catch (error) {
			console.error('Firestore에서 스케줄 삭제 실패:', error);
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
				<S.CategoryText>{schedule.category}</S.CategoryText>
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
	);
};
