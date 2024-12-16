import styled from 'styled-components';

export const SalaryManagementContainer = styled.section``;

export const ModalComponent = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	color: var(--color-black);
`;

export const Info = styled.div`
	padding: var(--space-medium) var(--space-large);
	border-bottom: 2px solid var(--color-light-gray);
`;

export const Row = styled.div`
	display: flex;
	width: 100%;
	margin: var(--space-medium) 0;
`;

export const DataSet = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-medium);
	flex: 1;

	&:last-child {
		text-align: right;
	}

	&:first-child {
		text-align: left;
	}
`;

export const Label = styled.div`
	font-weight: 700;
	white-space: nowrap;
`;

export const Data = styled.p`
	margin: 0;
	word-break: break-word;
	flex: 1;
`;

export const Form = styled.div`
	padding: var(--space-medium) var(--space-large);
`;

export const Input = styled.input`
	flex-grow: 1;
	padding: var(--space-small) var(--space-small);
	border: 1px solid var(--color-dark-gray);
	border-radius: var(--small-border-radius);
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: var(--color-blue);
		box-shadow: var(--box-shadow-small);
	}
`;

export const Select = styled.select`
	padding: var(--space-xsmall) var(--space-small);
	border: 1px solid var(--color-dark-gray);
	border-radius: var(--small-border-radius);
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: var(--color-blue);
		box-shadow: var(--box-shadow-small);
	}
`;

export const DataSelect = styled.select``;
