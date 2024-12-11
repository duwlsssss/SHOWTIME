import CheckboxItem from './CheckboxItem';
import styled from 'styled-components';

const CheckboxGroup = () => {
	const categoryMap = {
		all: '전체',
		ticket: '매표',
		snack: '매점',
		floor: '플로어',
	} as const;

	return (
		<CheckboxContiner>
			<h3>카테고리</h3>
			<CheckboxUL>
				{Object.entries(categoryMap).map(([key, value], index) => (
					<>
						<CheckboxItem item={value} categoryKey={key} key={index} />
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
	padding: var(--space-large);
	width: 300px;
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-large);
	overflow-y: auto;
`;

const CheckboxUL = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 20px;
	gap: 10px;
`;
