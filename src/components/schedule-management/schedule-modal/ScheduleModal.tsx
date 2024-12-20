import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as S from './ScheduleModal.styles';
import {
	TSchedule,
	scheduleSchema,
	TFormValues,
	TScheduleRepeatCycle,
	SCHEDULE_CATEGORY_OPTIONS,
	SCHEDULE_REPEAT_CYCLE_OPTIONS,
	TScheduleModalProps,
} from '@/types/schedule';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
	setIsConfirmModalOpen,
	setIsScheduleAddModalOpen,
	setIsScheduleEditModalOpen,
} from '@/redux/actions/modalActions';
import { setSelectedSchedule, setfilterCategory } from '@/redux/actions/scheduleActions';
import { getAdminEmployeeSchedules } from '@/redux/actions/employeeActions';
import { Toggle } from '../../toggle/Toggle';
import { Button } from '../../button/Button';
import { ModalPortal, ConfirmModal } from '@/components';
import SearchEmployeeList from '@/components/schedule-management/search/SearchEmployeeList';
import useScheduleManage from '@/hooks/useScheduleManage';
import useDebounce from '@/hooks/useDebounce';
import { formatDate, formatDateTime, fixMinute } from '@/utils/dateFormatter';
import calculateScheduleShiftType from '@/utils/calculateScheduleShiftType';
import calculateEndDateTime from '@/utils/calculateEndDateTime';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';

export const ScheduleModal = React.memo(function ScheduleModal({
	type,
	mode,
}: TScheduleModalProps) {
	const [isRepeatActive, setIsRepeatActive] = useState<boolean>(false); // 토글 상태
	const [pendingScheduleData, setPendingScheduleData] = useState<TSchedule | null>(null); // 수정할 데이터
	const [searchListOpen, setSearchListOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchUserId, setSearchUserId] = useState<string>('');
	const dispatch = useAppDispatch();

	const selectedSchedule = useAppSelector((state) => state.schedule.selectedSchedule);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const isConfirmModalOpen = useAppSelector((state) => state.modal.isConfirmModalOpen);
	const employeeSchedules = useAppSelector((state) => state.employee.schedules);

	// 관리자에서 searchUserId로 사용자 이름, 별명 추출
	const getUserDetailsById = (userId?: string) => {
		//관리자일때 체크하기
		if (!userId || !employeeSchedules?.length) return null;
		return employeeSchedules.find((employee) => employee.user_id === userId);
	};

	const isAdminAddMode = type === 'scheduleAdmin' && mode === 'add';

	const user = useAppSelector((state) => state.user.user);
	const userId = user?.id;
	const selectedEmployee = getUserDetailsById(
		isAdminAddMode ? searchUserId : selectedSchedule?.user_id,
	);
	const userName = type === 'scheduleAdmin' ? selectedEmployee?.user_name : user?.userName;
	const userAlias = type === 'scheduleAdmin' ? selectedEmployee?.user_alias : user?.userAlias;
	const schedules = useAppSelector((state) => state.schedule.schedules);

	const debouncedSearchTerm = useDebounce(searchTerm, 200);
	const searchRef = useRef<HTMLDivElement | null>(null);

	const getUserIdToSend = useCallback((): string => {
		if (type === 'scheduleAdmin') {
			return mode === 'add' ? searchUserId : (selectedSchedule?.user_id ?? '');
		}
		if (!userId) throw new Error('userId가 필요합니다');
		return userId;
	}, [searchUserId, selectedSchedule?.user_id, type, mode, userId]);

	const { handleAddSchedule, handleEditSchedule, readLoading } = useScheduleManage(
		getUserIdToSend(),
		schedules,
	);

	readLoading();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, touchedFields },
		setValue, // 시작 날짜 분 없애는 용
		watch,
		trigger,
	} = useForm<TFormValues>({
		resolver: zodResolver(scheduleSchema),
		mode: 'onChange',
		defaultValues: {
			user_id: isAdminAddMode ? '' : undefined,
			category: '',
			start_date_time: fixMinute(formatDateTime(new Date(selectedDate))),
			time: '',
			repeat: undefined,
			repeat_end_date: undefined,
			description: '',
		},
	});

	// 컴포넌트가 마운트되면 즉시 validation 실행
	useEffect(() => {
		trigger(['category', 'time']);
	}, [trigger]);

	const startDateTime = watch('start_date_time'); // 시작 일시 값 감시
	const repeatCycle = watch('repeat'); // 반복 주기 감시
	const repeatEndDate = watch('repeat_end_date'); // 종료일 값 감시
	const userIdValue = watch('user_id'); // 관리자 폼에서 직원 입력 감시

	// 실시간으로 에러 메시지 생성
	const noneStartDateTimeError = !startDateTime ? '시작일시를 선택해주세요' : null;
	const prevStartDateTimeError =
		type === 'scheduleUser' &&
		new Date(startDateTime).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
			? '오늘 이후의 스케줄만 입력해주세요'
			: null;
	const noneRepeatCycleError = isRepeatActive && !repeatCycle ? '반복주기를 선택해주세요' : null;
	const noneEndDateError = isRepeatActive && !repeatEndDate ? '종료일을 선택해주세요' : null;
	const repeatEndDateError =
		isRepeatActive &&
		repeatEndDate &&
		startDateTime &&
		new Date(repeatEndDate).setHours(0, 0, 0, 0) < new Date(startDateTime).setHours(0, 0, 0, 0)
			? '반복 종료일은 시작일 이후여야 합니다'
			: null;
	const userIdError =
		(isAdminAddMode && !userIdValue) || !searchUserId ? '직원을 선택해주세요' : null;

	// 디버깅용
	// console.log('current form', {
	// 	errors: errors,
	// 	noneStartDateTimeError: noneStartDateTimeError,
	// 	today: new Date().setHours(0, 0, 0, 0),
	// 	prevStartDateTime: new Date(startDateTime).setHours(0, 0, 0, 0),
	// 	prevStartDateTimeError: prevStartDateTimeError,
	// 	noneRepeatCycleError: noneRepeatCycleError,
	// 	noneEndDateError: noneEndDateError,
	// 	repeatEndDateError: repeatEndDateError,
	// 	userIdError: userIdError,
	// 	repeatEndDate: repeatEndDate ? new Date(repeatEndDate) : '',
	// 	startDateTime: new Date(startDateTime),
	// 	user_id: getUserIdToSend(),
	// 	userName: userName,
	// 	userAlias: userAlias,
	// 	isSubmitting: isSubmitting,
	// 	data: watch(),
	// 	currentUser: user,
	// });

	// 날짜 선택시 분을 00으로 초기화
	const handleDateTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = fixMinute(e.target.value);
	}, []);

	// edit 모드일때 초기값 설정
	useEffect(() => {
		if (mode === 'edit' && selectedSchedule) {
			setValue('category', selectedSchedule.category);
			// datetime-local input을 위한 날짜 포맷팅
			setValue('start_date_time', formatDateTime(new Date(selectedSchedule.start_date_time)));
			setValue('time', selectedSchedule.time);
			setValue('description', selectedSchedule.description ?? '');
			if (selectedSchedule.repeat && selectedSchedule.repeat_end_date) {
				setIsRepeatActive(true);
				// date input을 위한 날짜 포맷팅
				setValue('repeat', selectedSchedule.repeat);
				setValue('repeat_end_date', formatDate(new Date(selectedSchedule.repeat_end_date)));
			}
			trigger(['category', 'time']); // 유효성 검사 트리거
		}
	}, [mode, selectedSchedule, setValue, trigger]);

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
		const scheduleData: TSchedule = {
			schedule_id: mode === 'edit' ? (selectedSchedule?.schedule_id ?? uuidv4()) : uuidv4(), // 한 개 수정시 이전 schedule_id 필요
			user_id: getUserIdToSend(),
			user_name: userName as string,
			user_alias: userAlias as string,
			category: data.category,
			start_date_time: new Date(data.start_date_time),
			time: data.time,
			end_date_time: new Date(calculateEndDateTime(data.start_date_time, data.time)),
			schedule_shift_type: calculateScheduleShiftType(data.start_date_time),
			repeat: (data.repeat as TScheduleRepeatCycle) || null,
			repeat_end_date: data.repeat_end_date ? new Date(data.repeat_end_date) : undefined,
			created_at: new Date(),
			description: (data.description as string) || undefined,
		};

		if (mode === 'add') {
			const newSchedules = generateRepeatingSchedules(scheduleData);
			await handleAddSchedule(newSchedules);
			dispatch(setIsScheduleAddModalOpen(false)); // 일정 추가 모달 닫기
		} else {
			// edit 모드
			if (selectedSchedule) {
				// 반복 일정인 경우
				const repeatedSchedules = filteredRepeatSchedules(selectedSchedule, schedules);
				const isRecurring = repeatedSchedules.length > 1;

				if (isRecurring) {
					setPendingScheduleData(scheduleData);
					dispatch(setIsConfirmModalOpen(true));
					return; // 모달 응답 기다림
				}

				// 반복이 아닌 일정은 바로 수정
				await handleEditSchedule(selectedSchedule, scheduleData, false);
				dispatch(setIsScheduleEditModalOpen(false)); // 일정 수정 모달 닫기
			}
		}
		dispatch(setfilterCategory('')); // 카테고리 필터 해제
	});

	// confirm 모달 응답 처리
	const handleConfirmEdit = async (editAll: boolean) => {
		if (!pendingScheduleData) return;
		if (selectedSchedule) {
			await handleEditSchedule(selectedSchedule, pendingScheduleData, editAll);
			dispatch(setIsConfirmModalOpen(false));
			dispatch(setIsScheduleEditModalOpen(false));
		}
	};

	// 모달 바깥 클릭 처리
	const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}, []);

	// 버튼 disabled 상태
	const isButtonDisabled = Boolean(
		Object.keys(errors).length > 0 ||
			isSubmitting ||
			noneStartDateTimeError ||
			prevStartDateTimeError ||
			noneEndDateError ||
			repeatEndDateError,
	);

	// 직원 검색
	const handleEmployeeSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}, []);

	useEffect(() => {
		if (debouncedSearchTerm.length > 0) {
			setSearchListOpen(true);
			dispatch(getAdminEmployeeSchedules(debouncedSearchTerm));
		} else {
			setSearchListOpen(false);
			dispatch(getAdminEmployeeSchedules(''));
		}
	}, [debouncedSearchTerm]);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
			setSearchListOpen(false);
		}
	}, []);

	// 디버깅용
	// console.log('current Search', {
	// 	searchListOpen: searchListOpen,
	// 	debouncedSearchTerm: debouncedSearchTerm,
	// 	employeeSchedules: employeeSchedules,
	// 	searchUserId: searchUserId,
	// 	mode: mode,
	// 	type: type,
	// });

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

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

						{isAdminAddMode && (
							<>
								<S.ModalWrapperSubTitle>직원</S.ModalWrapperSubTitle>
								<S.SearchInputContainer>
									<S.InputWrapper ref={searchRef}>
										<S.ModalSearchInput
											{...register('user_id')}
											placeholder="이름이나 닉네임을 입력해주세요."
											onChange={(e) => handleEmployeeSearchChange(e)}
											error={touchedFields.user_id && userIdError ? true : undefined}
										/>
										<S.SearchList
											$searchListOpen={searchListOpen}
											$isEmpty={employeeSchedules.length === 0}
										>
											{searchListOpen ? (
												employeeSchedules.length > 0 ? (
													employeeSchedules.map((value) => (
														<SearchEmployeeList
															schedulesItem={value}
															key={value.schedule_id}
															onSetSearchListOpen={setSearchListOpen}
															onSetSearchUserId={() => {
																setSearchUserId(value.user_id);
																setValue('user_id', value.user_name);
															}}
														/>
													))
												) : (
													<S.NoSearchResultText>검색 결과가 없습니다.</S.NoSearchResultText>
												)
											) : null}
										</S.SearchList>
										{touchedFields.user_id && userIdError && (
											<S.ErrorMessage>{userIdError}</S.ErrorMessage>
										)}
									</S.InputWrapper>
								</S.SearchInputContainer>
							</>
						)}

						<S.ModalWrapperSubTitle>기간</S.ModalWrapperSubTitle>
						<S.ModalScheduleDateInput>
							<S.InputWrapper>
								<S.DateTimeInput
									type="datetime-local"
									id="start_date_time"
									{...register('start_date_time', {
										onChange: (e) => {
											handleDateTimeChange(e);
										},
									})}
									error={
										(touchedFields.start_date_time && noneStartDateTimeError) ||
										prevStartDateTimeError
											? true
											: undefined
									}
								/>
								{touchedFields.start_date_time && noneStartDateTimeError && (
									<S.ErrorMessage>{noneStartDateTimeError}</S.ErrorMessage>
								)}
								{prevStartDateTimeError && (
									<S.ErrorMessage>{prevStartDateTimeError}</S.ErrorMessage>
								)}
							</S.InputWrapper>
							<S.InputWrapper>
								<S.TimeWrapper>
									<S.TimeInput
										type="text"
										id="time"
										{...register('time')}
										error={touchedFields.time && errors.time ? true : undefined}
									/>
									<span>시간</span>
								</S.TimeWrapper>
								{touchedFields.time && errors.time && (
									<S.ErrorMessage>{errors.time.message}</S.ErrorMessage>
								)}
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
											$error={touchedFields.repeat && noneRepeatCycleError ? true : undefined}
										>
											<option value="">반복 주기</option>
											{Object.values(SCHEDULE_REPEAT_CYCLE_OPTIONS).map(({ value, label }) => (
												<option key={value} value={value}>
													{label}
												</option>
											))}
										</S.StyledSelect>
										{touchedFields.repeat && noneRepeatCycleError && (
											<S.ErrorMessage>{noneRepeatCycleError}</S.ErrorMessage>
										)}
									</S.InputWrapper>
									<S.InputWrapper>
										<S.DateTimeInput
											type="date"
											{...register('repeat_end_date')}
											error={
												(touchedFields.repeat_end_date && noneEndDateError) || repeatEndDateError
													? true
													: undefined
											}
										/>
										{touchedFields.repeat_end_date && noneEndDateError && (
											<S.ErrorMessage>{noneEndDateError}</S.ErrorMessage>
										)}
										{repeatEndDateError && <S.ErrorMessage>{repeatEndDateError}</S.ErrorMessage>}
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
										<label
											htmlFor={value}
											onClick={(e) => {
												e.preventDefault();
											}}
										>
											{label}
										</label>
									</S.WorkLi>
								))}
							</S.WorkUl>
							{touchedFields.category && errors.category && (
								<S.ErrorMessage>{errors.category.message}</S.ErrorMessage>
							)}
						</S.InputWrapper>

						<S.InputWrapper>
							<S.DescriptionInput
								{...register('description')}
								placeholder={'업무에 대한 설명을 작성해주세요.'}
								error={touchedFields.description && errors.description ? true : undefined}
							/>
							{touchedFields.description && errors.description && (
								<S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
							)}
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
});
