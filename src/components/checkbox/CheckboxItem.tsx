import styled from 'styled-components';

interface CheckboxItemProps {
	item: 'ticket' | 'snack' | 'floor';
}

const CheckboxItem = ({ item }: CheckboxItemProps) => {
	return (
		<ListItem>
			<Label htmlFor={item}>
				<HiddenCheckbox id={item} type="checkbox" />
				<CustomCheckbox />
				<CheckboxText>{item}</CheckboxText>
			</Label>
		</ListItem>
	);
};

export default CheckboxItem;

const ListItem = styled.li`
	list-style: none;
	margin-bottom: 8px;

	display: flex;
	&:nth-child(3) {
		display: block;
		border-bottom: 1px solid black;
		padding-bottom: 10px;
		width: 100px;
	}
	&:nth-child(4) {
		margin-top: 10px;
	}
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	display: none;
`;

const CustomCheckbox = styled.div`
	width: 20px;
	height: 20px;
	border: 2px solid #ccc;
	border-radius: 4px;
	margin-right: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	transition: all 0.2s ease;

	${HiddenCheckbox}:checked + & {
		border-color: var(--color-green);
		background-color: var(--color-green);
		&::after {
			content: '';
			display: block;
			width: 5px;
			height: 10px;
			border: solid white;
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
		}
	}
`;

const CheckboxText = styled.span`
	font-size: 16px;
`;
