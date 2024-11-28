import { StyledInput, StyledHelperText } from './Input.style';

type InputProps = {
	type?: string;
	placeholder?: string;
	value?: string;
	onChange?: () => void;
	onClick?: () => void;
	helperText?: string;
	className?: string;
	borderColor?: string;
	focusColor?: string;
};

const Input = ({
	type = 'text',
	placeholder = '',
	value = '',
	onChange,
	onClick,
	helperText = '',
	className = '',
	borderColor,
	focusColor,
}: InputProps) => {
	return (
		<div className={className}>
			<StyledInput
				className={className}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onClick={onClick}
				borderColor={borderColor}
				focusColor={focusColor}
			/>
			{helperText && <StyledHelperText>{helperText}</StyledHelperText>}
		</div>
	);
};

export default Input;
