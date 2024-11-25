import styled from 'styled-components';

export const StyledButton = styled.button<{ $padding?: string; $color?: string; $shape?: string }>`
	padding: ${(props) => props.$padding || '0.5rem 0.8rem'};
	border-radius: var(--large-border-radius);
	background-color: transparent;
	font-weight: 700;
	transition: all 0.3s;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
	}

	${({ $color, $shape }) =>
		$shape === 'line'
			? `
    border: 2px solid var(--color-${$color});
    color: var(--color-${$color});

    &:hover {
      background-color: var(--color-${$color});
      color: var(--color-white);
    }
  `
			: `
    background-color: var(--color-${$color});
    border: none;
    color: var(--color-white);

    &:hover {
      box-shadow: var(--box-shadow-large);
    }
  `}
`;
