import styled from 'styled-components';
import CheckboxItem from './CheckboxItem';
import { SCHEDULE_FILTER_CATEGORY_LABEL, TScheduleCategory } from '@/types/schedule';

export const CheckboxGroup = () => {
	return (
		<CheckboxContiner>
			<h3>카테고리</h3>
			<CheckboxUL>
				{Object.entries(SCHEDULE_FILTER_CATEGORY_LABEL).map(([key, value]) => (
					<CheckboxItem item={value} categoryKey={key as TScheduleCategory} key={key} />
				))}
			</CheckboxUL>
		</CheckboxContiner>
	);
};

const CheckboxContiner = styled.div`
	display: flex;
	flex-direction: column;
	padding: var(--space-large) var(--space-xlarge) var(--space-large) var(--space-medium);
	gap: var(--space-large);
	white-space: nowrap;
	overflow-y: auto;

	h3 {
		font-size: var(--font-medium);
		font-weight: 700;
	}
`;

const CheckboxUL = styled.ul`
	display: flex;
	flex-direction: column;
	gap: var(--space-small);
`;
