import { fiteredCalendar } from '@/constants/fiteredCalendar';
import CheckboxItem from './CheckboxItem';
import styled from 'styled-components';

const CheckboxGroup = () => {
	const categoryMap = {
		매표: 'ticket',
		매점: 'snack',
		플로어: 'floor',
	} as const;

	return (
		<CheckboxContiner>
			<h3>카테고리</h3>
			<CheckboxUL>
				{Object.entries(fiteredCalendar).map(([key, value]) => (
					<>
						{/* <CheckboxItem item={value} key={key} /> */}
						{/* 빌드 오류로 CheckboxItem 컴포넌트 호출 부분 수정 */}
						<CheckboxItem item={categoryMap[value]} key={key} />
					</>
				))}
			</CheckboxUL>
		</CheckboxContiner>
	);
};

export default CheckboxGroup;

const CheckboxContiner = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 20px;

	justify-content: center;
	width: 400px;
`;

const CheckboxUL = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	margin-top: 20px;
`;
