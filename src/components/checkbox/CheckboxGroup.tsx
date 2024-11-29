import { fiteredCalendar } from '@/constants/fiteredCalendar';
import CheckboxItem from './CheckboxItem';
import styled from 'styled-components';

const CheckboxGroup = () => {
	return (
		<CheckboxContiner>
			<h3>카테고리</h3>
			<CheckboxUL>
				{Object.entries(fiteredCalendar).map(([key, value]) => (
					<>
						<CheckboxItem item={value} key={key} />
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
