import styled from 'styled-components';

export const ProfileContainer = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: var(--space-medium);
`;

export const FormContainer = styled.div`
	background: var(--color-white);
	border-radius: var(--medium-border-radius);
	padding: var(--space-large);
	box-shadow: var(--box-shadow-small);
`;

export const FormTitle = styled.h1`
	font-size: var(--font-large);
	color: var(--color-black);
`;

export const FormField = styled.div`
	display: flex;
	align-items: center;
	padding: var(--space-medium) 0;
	border-bottom: 1px solid var(--color-light-gray);

	&:last-child {
		border-bottom: none;
	}
`;

export const Label = styled.label`
	width: 120px;
	color: var(--color-dark-gray);
	font-size: var(--font-medium);
`;

export const Value = styled.div`
	flex: 1;
	color: var(--color-black);
	font-size: var(--font-medium);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const EditButton = styled.button`
	background: none;
	border: none;
	color: var(--color-blue);
	cursor: pointer;
	padding: var(--space-xsmall) var(--space-small);
	font-size: var(--font-medium);

	&:hover {
		text-decoration: underline;
	}
`;

export const Input = styled.input`
	flex: 1;
	padding: var(--space-small);
	border: 1px solid var(--color-light-gray);
	border-radius: var(--xsmall-border-radius);
	font-size: var(--font-medium);

	&:disabled {
		background: none;
		border: none;
		padding: 0;
	}
`;

export const Select = styled.select`
	flex: 1;
	padding: var(--space-small);
	border: 1px solid var(--color-light-gray);
	border-radius: var(--xsmall-border-radius);
	font-size: var(--font-medium);

	&:disabled {
		background: none;
		border: none;
		padding: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
`;

export const CheckboxGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-small);
`;

export const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: var(--space-xsmall);
	font-size: var(--font-medium);
	color: var(--color-black);

	input[type='checkbox'] {
		width: 16px;
		height: 16px;
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: var(--space-small);
	margin-top: var(--space-medium);
`;

export const Button = styled.button<{ $primary?: boolean }>`
	padding: var(--space-small) var(--space-medium);
	border-radius: var(--xsmall-border-radius);
	font-size: var(--font-medium);
	cursor: pointer;

	${(props) =>
		props.$primary
			? `
    background: var(--color-blue);
    color: var(--color-white);
    border: none;
  `
			: `
    background: var(--color-white);
    color: var(--color-dark-gray);
    border: 1px solid var(--color-light-gray);
  `}
`;

export const FormSubTitle = styled.p`
	font-size: var(--font-medium);
	color: var(--color-dark-gray);
	margin-top: var(--space-medium);
	margin-bottom: var(--space-large);
`;

export const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: var(--space-xsmall);
`;

export const TitleGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ErrorMessage = styled.div`
	color: var(--color-red);
	font-size: var(--font-small);
	margin-top: var(--space-xsmall);
	padding-left: 120px;
`;
