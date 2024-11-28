import styled from 'styled-components';

export const LoginContainer = styled.main`
	min-height: 100vh;
	display: flex;
	background-color: #f3f4f6;
`;

export const LeftSection = styled.div`
	display: none;
	width: 50%;
	background-color: #f3f4f6;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	@media (min-width: 1024px) {
		display: flex;
	}

	img {
		width: 600px;
		height: 900px;
		object-fit: fill;
		flex-shrink: 0;
		flex-grow: 0;
		max-width: none;
		max-height: none;
	}
`;

export const RightSection = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 2rem;
	position: relative;

	@media (min-width: 1024px) {
		width: 50%;
	}
`;

export const FormContainer = styled.div`
	background-color: white;
	padding: 2rem 1.5rem;
	border-radius: 1rem;
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	min-width: 320px;
	max-width: 320px;
	justify-content: center;
`;

export const FormTitle = styled.h1`
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 2.5rem;
`;

export const FormField = styled.div`
	margin-bottom: 2rem;
`;

export const Label = styled.label`
	display: block;
	font-size: 0.875rem;
	font-weight: 500;
	color: #374151;
	margin-bottom: 0.25rem;
`;

interface InputProps {
	hasError?: boolean;
}

export const Input = styled.input<InputProps>`
	width: 100%;
	padding: 0.5rem 0.75rem;
	border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
	border-radius: 0.375rem;
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}
`;

export const ErrorMessage = styled.p`
	color: #ef4444;
	font-size: 0.875rem;
	margin-top: 0.5rem;
`;

export const SubmitButton = styled.button`
	width: 100%;
	padding: 0.5rem 1rem;
	background-color: #93e9f9;
	color: white;
	border: none;
	border-radius: 0.375rem;
	font-size: 0.875rem;
	font-weight: 500;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: #1d4ed8;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const Logo = styled.div`
	margin-bottom: 2rem;

	img {
		width: 150px;
		height: auto;
	}
`;

export const WelcomeText = styled.div`
	text-align: center;
	margin-bottom: 2rem;

	h1 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.125rem;
		opacity: 0.9;
	}
`;
