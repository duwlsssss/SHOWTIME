import styled from 'styled-components';

interface StyledInputProps {
	borderColor?: string;
	focusColor?: string;
	error?: boolean;
}

export const StyledInput = styled.input.withConfig({
	shouldForwardProp: (prop) => prop !== 'error', // error 속성 DOM 전달 방지
})<StyledInputProps>`
	width: 100%;
	padding: var(--space-small);
	border: 1px solid ${({ borderColor }) => borderColor || 'var( --color-dark-gray)'};
	border-radius: var(--small-border-radius);

	&::placeholder {
		color: var(--color-regular-gray);
	}

	&:focus {
		outline: 1px solid ${({ focusColor }) => focusColor || 'var(--color-blue)'};
	}

	/* 유효성 검사 통과 못했을때 */
	border: 1px solid
		${({ borderColor, error }) =>
			error ? 'var(--color-coral-dark)' : borderColor || 'var(--color-dark-gray)'};
	&:focus {
		outline: 1px solid
			${({ focusColor, error }) =>
				error ? 'var(--color-coral-dark)' : focusColor || 'var(--color-blue)'};
	}
`;

export const StyledHelperText = styled.div`
	padding: 8px 4px 0;
	text-align: left;
	font-size: 12px;
`;
