import React, { forwardRef } from 'react';
import { StyledInput } from './Input.style';

// InputHTMLAttributes를 확장해 모든 HTML input 속성을 지원하도록 함
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	helperText?: string;
	className?: string;
	borderColor?: string;
	focusColor?: string;
	error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ helperText, className = '', borderColor, focusColor, error = false, ...props }, ref) => {
		return (
			<div className={className}>
				<StyledInput
					ref={ref}
					{...props}
					borderColor={borderColor}
					focusColor={focusColor}
					error={error}
				/>
				{helperText && <span>{helperText}</span>}
			</div>
		);
	},
);

Input.displayName = 'Input'; // React DevTools에서 컴포넌트 이름 표시

export default Input;
