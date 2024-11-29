import { formatToKoreanTime } from '@/utils/dateFormatter';
import styled from 'styled-components';
import { Toggle } from '../toggle/Toggle';

//admin의 경우 회원가입 시 관리자인지 구분하여 저장하는 데이터베이스 데이터가 있기때문에 그걸 토대로
//각 사용자에 맞는 UI를 보여주면 될것으로 보임.

const ScheduleModal = () => {
	const isAdmin = false; // firebase auth 연결 필요

	const dateAt = formatToKoreanTime(new Date());
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
	};
	return (
		<ModalOverlay>
			<ModalContent onSubmit={handleSubmit}>
				<ModalContentTop>
					<h1>일정 추가</h1>
					<InputWrapper>
						<Icon onClick={() => console.log('검색')}>🔍</Icon>
						{isAdmin && (
							<ModalSearchInput
								type="text"
								placeholder="이름을 검색하여 주세요."
								required={true}
								maxLength={5}
							/>
						)}
					</InputWrapper>
				</ModalContentTop>
				<ModalWrapperTopSubTitle>기간</ModalWrapperTopSubTitle>
				<ModalWrapperContainerTop>
					<DateTimeInput type="datetime-local" defaultValue={dateAt} id="startAt" />
					<CloseTime type="text" defaultValue={'5'} required={true} maxLength={2} />
					<span>시간</span>
				</ModalWrapperContainerTop>
				<ModalToggleContainer>
					<Toggle />
					<span>반복 설정</span>
					<select>
						<option>반복주기</option>
						<option>년</option>
						<option>월</option>
						<option>일</option>
					</select>
					<DateInput type="date" defaultValue={dateAt} />
				</ModalToggleContainer>
				<WorkWrapper>
					<WorkTitle>업무</WorkTitle>
					<WorkUl>
						<WorkTitle>종류</WorkTitle>
						<li>
							<input type="checkbox" value={'오픈'} id="open" />
							<label htmlFor="open">매표</label>
						</li>
						<li>
							<input type="checkbox" value={'미들'} id="middle" />
							<label htmlFor="middle">매점</label>
						</li>
						<li>
							<input type="checkbox" value={'마감'} id="close" />
							<label htmlFor="close">플로어</label>
						</li>
					</WorkUl>
					<TodoInput type="text" placeholder={'업무에 대한 설명을 작성해주세요.'} maxLength={30} />
				</WorkWrapper>
				<ButtonContainer>
					<CreateButton type="submit">추가하기</CreateButton>
				</ButtonContainer>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ScheduleModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.form`
	background: white;
	padding: 20px;
	border-radius: 8px;
	min-width: 300px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalContentTop = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const ModalSearchInput = styled.input`
	width: 327px;
	height: 32px;
	border-radius: 10px;

	border-radius: 5px;
	outline: none;
	font-size: 14px;

	&:focus {
		border-color: #007bff;
	}
`;

const ModalWrapperContainerTop = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const ModalWrapperTopSubTitle = styled.h2`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const ModalToggleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-top: 1rem;
`;

const DateTimeInput = styled.input`
	border: none;
	font-size: 20px;
	&:focus {
		border: none;
		outline: none;
	}
	&::-webkit-calendar-picker-indicator {
		//아이콘 custom
		background-image: none;
		background-size: contain;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`;

const DateInput = styled.input`
	border: none;
	font-size: 14px;
	&:focus {
		border: none;
		outline: none;
	}
	&::-webkit-calendar-picker-indicator {
		//아이콘 custom
		background-image: none;
		background-size: contain;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`;

const WorkWrapper = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 0.5rem;
`;

const WorkTitle = styled.h2`
	font-weight: bold;
	color: #000;
`;

const WorkUl = styled.ul`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const CloseTime = styled.input`
	width: 24px;
	text-align: center;
	/* margin-top: 1rem; */
`;

const TodoInput = styled.input`
	width: 400px;
	border-radius: 10px;
	border: 1px solid black;
	height: 30px;
	padding-left: 10px;
`;

const ButtonContainer = styled.div`
	float: right;
`;

const CreateButton = styled.button`
	border: var(--color-skyblue-light-dark);
	outline: var(--color-skyblue-light-dark);
	background-color: transparent;
	color: var(--color-skyblue-light-dark);
	cursor: pointer;
	margin-top: 20px;
`;

const Icon = styled.span`
	position: absolute;
	top: 50%;
	right: 25%;
	transform: translateY(-50%);
	font-size: 16px;
`;

const InputWrapper = styled.div`
	position: relative;
	display: inline-block;
`;
