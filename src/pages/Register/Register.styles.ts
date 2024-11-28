import styled from 'styled-components';

export const RegisterContainer = styled.main`
	min-height: 100vh;
	display: flex;
	background-color: #f3f4f6;
`;

export const LeftSection = styled.div`
	display: none;
	width: 40%;
	background-color: #2563eb;
	color: white;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	transition: all 0.3s;
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
	position: relative;
	background-color: #f3f4f6;

	@media (min-width: 1024px) {
		width: 60%;
		margin-left: auto;
	}
`;

export const FormContainer = styled.div`
	background-color: white;
	padding: 2.5rem 3rem;
	border-radius: 1rem;
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	width: 470px;
	min-width: 470px;
	max-width: 470px;

	@media (max-width: 520px) {
		width: 320px;
		min-width: 320px;
		max-width: 320px;
		padding: 2rem 1.5rem;
	}
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

type ValidationState = {
	$validation?: 'valid' | 'invalid' | 'default';
};

export const Input = styled.input<ValidationState>`
	width: 100%;
	height: 42px;
	padding: 0.5rem 0.75rem;
	border: 1px solid
		${({ $validation }) => {
			switch ($validation) {
				case 'invalid':
					return '#ef4444';
				case 'valid':
					return '#22c55e';
				default:
					return '#d1d5db';
			}
		}};
	border-radius: 0.375rem;
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}
`;

export const Select = styled.select<ValidationState>`
	width: 100%;
	height: 42px;
	padding: 0.5rem 0.75rem;
	border: 1px solid
		${({ $validation }) => {
			switch ($validation) {
				case 'invalid':
					return '#ef4444';
				case 'valid':
					return '#22c55e';
				default:
					return '#e2e8f0';
			}
		}};
	border-radius: 0.375rem;
	font-size: 1rem;
	appearance: none;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%236B7280' stroke-width='1.67' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
		no-repeat right 0.75rem center;

	&:focus {
		outline: none;
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
	transition: all 0.3s ease;

	&:hover:not(:disabled) {
		background-color: #7dd3e3;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(147, 233, 249, 0.3);
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
	margin-bottom: 3rem;

	h1 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.1rem;
		opacity: 0.9;
	}
`;
