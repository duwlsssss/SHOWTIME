import * as S from './Button.styles';

type TButtonProps = {
	className?: string;
	color?: string;
	shape?: string;
	padding?: string;
	onClick?: () => void;
	children?: React.ReactNode;
	disabled?: boolean;
};

export function Button({
	className = '',
	color = 'gray',
	shape = 'line',
	padding = '0.5rem 0.8rem',
	onClick,
	children,
	disabled = false,
}: TButtonProps) {
	return (
		<S.StyledButton
			className={className}
			$color={color}
			$shape={shape}
			$padding={padding}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</S.StyledButton>
	);
}
