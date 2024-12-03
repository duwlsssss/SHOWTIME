import * as S from './ScheduleModal.styles';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setIsScheduleModalOpen } from '@/redux/actions/scheduleActions';
import {
	TSchedule,
	scheduleSchema,
	scheduleAdminSchema,
	TFormValues,
	TScheduleRepeatCycle,
	SCHEDULE_CATEGORY_OPTIONS,
	SCHEDULE_REPEAT_CYCLE_OPTIONS,
} from '@/types/schedule';
import calculateScheduleShiftType from '@/utils/calculateScheduleShiftType';
import calculateEndDateTime from '@/utils/calculateEndDateTime';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/firebaseConfig';
import { useForm } from 'react-hook-form';
import { Toggle } from '../../toggle/Toggle';
import { Button } from '../../button/Button';
import ModalPortal from '../../modal/ModalPortal';
// import useDebounce from '@/hooks/useDebounce';

interface TScheduleModalProps {
	type: 'scheduleUser' | 'scheduleAdmin';
	mode: 'add' | 'edit';
	onSubmit: (schedules: TSchedule[]) => Promise<void>;
	onClose: () => void;
}

const ScheduleModal = ({ type, mode, onSubmit, onClose }: TScheduleModalProps) => {
	const [isRepeatActive, setIsRepeatActive] = useState<boolean>(false); // 토글 상태

	const dispatch = useAppDispatch();

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
		currentUser: auth.currentUser,
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

	const onSubmitForm = handleSubmit(async (data) => {
		console.log('폼 제출 시작', data);
		const userId = auth.currentUser?.uid;
		const userName = auth.currentUser;
		console.log(userName);
		try {
			if (!userId) {
				throw new Error('사용자 인증 필요');
			}

			const scheduleData: TSchedule = {
				schedule_id: uuidv4(),
				user_id: userId,
				user_name: '',
				user_alias: '',
				category: data.category,
				start_date_time: data.start_date_time,
				time: data.time,
				end_date_time: calculateEndDateTime(data.start_date_time, data.time),
				schedule_shift_type: calculateScheduleShiftType(data.start_date_time),
				repeat: data.repeat as TScheduleRepeatCycle,
				repeat_end_date: data.repeat_end_date,
				created_at: new Date(),
				description: data.description,
			};

			// undefined 필드 제거
			const cleanedScheduleData = Object.fromEntries(
				Object.entries(scheduleData).filter(([, v]) => v !== undefined),
			) as TSchedule;

			const newSchedules = generateRepeatingSchedules(cleanedScheduleData);

			await onSubmit(newSchedules);
			onClose(); // 모달 닫기
		} catch (error) {
			console.error('폼 제출 실패:', error);
		}
	});

	return (
		<ModalPortal>
			<S.ModalOverlay>
				<S.ModalContent onSubmit={onSubmitForm}>
					<S.ModalContentTitle>
						<h1>일정 {mode === 'add' ? '추가' : '수정'}</h1>
						<S.CloseIcon onClick={() => dispatch(setIsScheduleModalOpen(false))} />
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
									<S.StyledSelect {...register('repeat')} $error={errors.repeat ? true : undefined}>
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
						{mode === 'add' ? (
							<Button color="blue" disabled={Object.keys(errors).length > 0 || isSubmitting}>
								추가하기
							</Button>
						) : (
							<Button color="green-dark" disabled={Object.keys(errors).length > 0 || isSubmitting}>
								수정하기
							</Button>
						)}
					</S.ButtonContainer>
				</S.ModalContent>
			</S.ModalOverlay>
		</ModalPortal>
	);
};

export default ScheduleModal;
