import * as S from './ScheduleModal.styles';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
	setIsConfirmModalOpen,
	setIsScheduleAddModalOpen,
	setIsScheduleEditModalOpen,
} from '@/redux/actions/modalActions';
import { setSelectedSchedule } from '@/redux/actions/scheduleActions';
import {
	TSchedule,
	scheduleSchema,
	scheduleAdminSchema,
	TFormValues,
	TScheduleRepeatCycle,
	SCHEDULE_CATEGORY_OPTIONS,
	SCHEDULE_REPEAT_CYCLE_OPTIONS,
	TScheduleModalProps,
} from '@/types/schedule';
import calculateScheduleShiftType from '@/utils/calculateScheduleShiftType';
import calculateEndDateTime from '@/utils/calculateEndDateTime';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { Toggle } from '../../toggle/Toggle';
import { Button } from '../../button/Button';
import ModalPortal from '../../modal/ModalPortal';
import { ConfirmModal } from '../../modal/Modal';
import useScheduleManage from '@/hooks/useScheduleManage';
// import useDebounce from '@/hooks/useDebounce';

const ScheduleModal = ({ type, mode }: TScheduleModalProps) => {
	const [isRepeatActive, setIsRepeatActive] = useState<boolean>(false); // 토글 상태
	const [pendingScheduleData, setPendingScheduleData] = useState<TSchedule | null>(null); // 수정할 데이터

	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.user.user);
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const isConfirmModalOpen = useAppSelector((state) => state.modal.isConfirmModalOpen);
	const selectedSchedule = useAppSelector((state) => state.schedule.selectedSchedule);

	const userId = user?.id;
	const userName = user?.userName;
	const userAlias = user?.userAlias;

	const { handleAddSchedule, handleEditSchedule } = useScheduleManage(userId ?? null, schedules);

	const schema = type === 'scheduleAdmin' ? scheduleAdminSchema : scheduleSchema;

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, touchedFields },
		setValue, // 시작 날짜 분 없애는 용
		watch, // 디버깅용
	} = useForm<TFormValues>({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	// 디버깅용
	console.log({
		errors: errors,
		isSubmitting: isSubmitting,
		data: watch(),
		currentUser: user,
	});

	const startDateTime = watch('start_date_time'); // 시작 일시 값 감시
	const repeatEndDate = watch('repeat_end_date'); // 종료일 값 감시

	// 실시간으로 에러 메시지 생성
	const noneStartDateTimeError = !startDateTime ? '시작일시를 선택해주세요' : null;
	const noneEndDateError = !repeatEndDate ? '종료일을 선택해주세요' : null;
	const repeatEndDateError =
		repeatEndDate && startDateTime && new Date(repeatEndDate) < new Date(startDateTime)
			? '반복 종료일은 시작일 이후여야 합니다'
			: null;

	// 날짜 선택시 분을 00으로 초기화
	const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value) {
			const [date, time] = value.split('T');
			const [hours] = time.split(':');
			const fixedValue = `${date}T${hours}:00`; // 분을 '00'으로 고정
			e.target.value = fixedValue; // 값 수정
		}
	};

	// edit 모드일때 초기값 설정
	useEffect(() => {
		if (mode === 'edit' && selectedSchedule) {
			setValue('category', selectedSchedule.category);
			// datetime-local input을 위한 날짜 포맷팅
			const formattedStartDate = new Date(selectedSchedule.start_date_time)
				.toISOString()
				.slice(0, 16);
			setValue('start_date_time', formattedStartDate);
			setValue('time', selectedSchedule.time);
			setValue('description', selectedSchedule.description || '');
			if (selectedSchedule.repeat && selectedSchedule.repeat_end_date) {
				setIsRepeatActive(true);
				// date input을 위한 날짜 포맷팅
				const formattedEndDate = new Date(selectedSchedule.repeat_end_date)
					.toISOString()
					.slice(0, 10);
				setValue('repeat', selectedSchedule.repeat);
				setValue('repeat_end_date', formattedEndDate);
			}
		}
	}, [mode, selectedSchedule, setValue]);

	// 모달 닫을 때
	const handleClose = () => {
		if (mode === 'add') {
			dispatch(setIsScheduleAddModalOpen(false));
		} else {
			dispatch(setIsScheduleEditModalOpen(false));
		}
		dispatch(setSelectedSchedule(null)); // 선택된 스케줄 초기화
	};

	const onSubmitForm = handleSubmit(async (data) => {
		try {
			if (!userId) throw new Error('userId가 없음');

			const scheduleData: TSchedule = {
				schedule_id: mode === 'edit' ? (selectedSchedule?.schedule_id ?? uuidv4()) : uuidv4(), // 한 개 수정시 이전 schedule_id 필요
				user_id: userId,
				user_name: userName as string,
				user_alias: userAlias as string,
				category: data.category,
				start_date_time: new Date(data.start_date_time),
				time: data.time,
				end_date_time: new Date(calculateEndDateTime(data.start_date_time, data.time)),
				schedule_shift_type: calculateScheduleShiftType(data.start_date_time),
				repeat: (data.repeat as TScheduleRepeatCycle) || null, // Supabase에 저장하기 전에 null로 변환
				repeat_end_date: data.repeat_end_date ? new Date(data.repeat_end_date) : null,
				created_at: new Date(),
				description: data.description as string | null,
			};

			if (mode === 'add') {
				const newSchedules = generateRepeatingSchedules(scheduleData);
				await handleAddSchedule(newSchedules);
				dispatch(setIsScheduleAddModalOpen(false)); // 일정 추가 모달 닫기
			} else {
				// edit 모드이고 반복 일정인 경우
				if (selectedSchedule) {
					const repeatedSchedules = filteredRepeatSchedules(selectedSchedule, schedules);
					const isRecurring = repeatedSchedules.length > 1;

					if (isRecurring) {
						setPendingScheduleData(scheduleData);
						dispatch(setIsConfirmModalOpen(true));
						return; // 모달 응답 기다림
					}
				}
				// 반복이 아닌 일정은 바로 수정
				await handleEditSchedule(scheduleData, false);
				dispatch(setIsScheduleEditModalOpen(false)); // 일정 수정 모달 닫기
			}
		} catch (error) {
			console.error('폼 제출 실패:', error);
		}
	});

	// confirm 모달 응답 처리
	const handleConfirmEdit = async (editAll: boolean) => {
		try {
			if (!pendingScheduleData) return;
			await handleEditSchedule(pendingScheduleData, editAll);
			dispatch(setIsConfirmModalOpen(false));
			dispatch(setIsScheduleEditModalOpen(false));
		} catch (error) {
			console.error('스케줄 수정 실패:', error);
		}
	};

	// 모달 바깥 클릭 처리
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	};

	// 버튼 disabled 상태
	const isButtonDisabled = Boolean(
		Object.keys(errors).length > 0 ||
			isSubmitting ||
			noneStartDateTimeError ||
			noneEndDateError ||
			repeatEndDateError,
	);

	return (
		<ModalPortal>
			{isConfirmModalOpen ? (
				<ConfirmModal
					onClose={() => {
						dispatch(setIsConfirmModalOpen(false));
					}}
					message={{
						confirm: '반복되는 일정을 모두 수정하시겠습니까?',
						leftBtn: '모두 수정',
						rightBtn: '이 일정만 수정',
					}}
					color={'green'}
					onClickLeftBtn={() => handleConfirmEdit(true)}
					onClickRightBtn={() => handleConfirmEdit(false)}
				/>
			) : (
				<S.ModalOverlay onClick={handleOverlayClick}>
					<S.ModalContent onSubmit={onSubmitForm}>
						<S.ModalContentTitle>
							<h1>일정 {mode === 'add' ? '추가' : '수정'}</h1>
							<S.CloseIcon onClick={handleClose} />
						</S.ModalContentTitle>

						{type === 'scheduleAdmin' && (
							<>
								<S.ModalWrapperSubTitle>직원</S.ModalWrapperSubTitle>
								<S.SearchInputContainer>
									<S.InputWrapper>
										<S.ModalSearchInput
											{...register('user_id')}
											error={errors.user_id ? true : undefined}
											placeholder="이름이나 닉네임을 입력해주세요."
										/>
										{errors.user_id && <S.ErrorMessage>{errors.user_id.message}</S.ErrorMessage>}
									</S.InputWrapper>
									<S.SearchIcon onClick={() => console.log('검색')}>🔍</S.SearchIcon>
								</S.SearchInputContainer>
							</>
						)}

						<S.ModalWrapperSubTitle>기간</S.ModalWrapperSubTitle>
						<S.ModalScheduleDateInput>
							<S.InputWrapper>
								<S.DateTimeInput
									type="datetime-local"
									{...register('start_date_time', {
										onChange: (e) => {
											handleDateTimeChange(e);
										},
									})}
									error={touchedFields.start_date_time && noneStartDateTimeError ? true : undefined}
								/>
								{touchedFields.start_date_time && noneStartDateTimeError && (
									<S.ErrorMessage>{noneStartDateTimeError}</S.ErrorMessage>
								)}
							</S.InputWrapper>
							<S.InputWrapper>
								<S.TimeWrapper>
									<S.TimeInput
										type="text"
										{...register('time')}
										error={errors.time ? true : undefined}
									/>
									<span>시간</span>
								</S.TimeWrapper>
								{errors.time && <S.ErrorMessage>{errors.time.message}</S.ErrorMessage>}
							</S.InputWrapper>
						</S.ModalScheduleDateInput>

						<S.ModalToggleContainer>
							<Toggle
								checked={isRepeatActive}
								onCheckedChange={(checked) => {
									setIsRepeatActive(checked);
									if (!checked) {
										// Toggle이 꺼질 때 관련 필드 초기화
										setValue('repeat', undefined);
										setValue('repeat_end_date', undefined);
									}
								}}
							/>
							<span>반복 설정</span>
							{isRepeatActive && (
								<>
									<S.InputWrapper>
										<S.StyledSelect
											{...register('repeat')}
											$error={errors.repeat ? true : undefined}
										>
											<option value="">반복 주기</option>
											{Object.values(SCHEDULE_REPEAT_CYCLE_OPTIONS).map(({ value, label }) => (
												<option key={value} value={value}>
													{label}
												</option>
											))}
										</S.StyledSelect>
										{errors.repeat && <S.ErrorMessage>{errors.repeat.message}</S.ErrorMessage>}
									</S.InputWrapper>
									<S.InputWrapper>
										<S.DateTimeInput
											type="date"
											{...register('repeat_end_date')}
											error={
												touchedFields.repeat_end_date && (noneEndDateError || repeatEndDateError)
													? true
													: undefined
											}
										/>
										{touchedFields.repeat_end_date && noneEndDateError && (
											<S.ErrorMessage>{noneEndDateError}</S.ErrorMessage>
										)}
										{touchedFields.repeat_end_date && repeatEndDateError && (
											<S.ErrorMessage>{repeatEndDateError}</S.ErrorMessage>
										)}
									</S.InputWrapper>
								</>
							)}
						</S.ModalToggleContainer>

						<S.LastModalWrapperSubTitle>업무</S.LastModalWrapperSubTitle>
						<S.InputWrapper>
							<S.WorkUl>
								{Object.values(SCHEDULE_CATEGORY_OPTIONS).map(({ value, label }) => (
									<S.WorkLi key={value}>
										<S.RadioInput
											type="radio"
											id={value}
											$categoryType={value}
											{...register('category')}
											value={value}
										/>
										<label htmlFor={value}>{label}</label>
									</S.WorkLi>
								))}
							</S.WorkUl>
							{errors.category && <S.ErrorMessage>{errors.category.message}</S.ErrorMessage>}
						</S.InputWrapper>

						<S.InputWrapper>
							<S.DescriptionInput
								{...register('description')}
								placeholder={'업무에 대한 설명을 작성해주세요.'}
								error={errors.description ? true : undefined}
							/>
							{errors.description && <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>}
						</S.InputWrapper>

						<S.ButtonContainer>
							<Button color={mode === 'add' ? 'blue' : 'green'} disabled={isButtonDisabled}>
								{mode === 'add' ? '추가하기' : '수정하기'}
							</Button>
						</S.ButtonContainer>
					</S.ModalContent>
				</S.ModalOverlay>
			)}
		</ModalPortal>
	);
};

export default ScheduleModal;
