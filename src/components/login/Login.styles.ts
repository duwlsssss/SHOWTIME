import styled from 'styled-components';

export const LoginContainer = styled.main`
	min-height: 80vh;
	display: flex;
	background-color: var(--color-pale-gray);
`;

export const LeftSection = styled.div`
	display: none;
	width: 50%;
	background-color: var(--color-pale-gray);
	align-items: center;
	justify-content: center;
	overflow: hidden;

	@media (min-width: 1024px) {
		display: flex;
	}

	img {
		width: 600px;
		height: 600px;
		object-fit: fill;
		flex-shrink: 0;
		flex-grow: 0;
		max-width: none;
		max-height: none;
	}
`;

export const RightSection = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 var(--space-large);
	position: relative;

	@media (min-width: 1024px) {
		width: 50%;
	}
`;

export const FormContainer = styled.div`
	background-color: var(--color-white);
	padding: var(--space-large) var(--space-medium);
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-xlarge);
	min-width: 320px;
	max-width: 320px;
	justify-content: center;
`;

export const FormTitle = styled.h1`
	text-align: center;
	font-size: var(--font-large);
	font-weight: bold;
	margin-bottom: var(--space-xlarge);
`;

export const FormField = styled.div`
	margin-bottom: var(--space-large);
`;

export const Label = styled.label`
	display: block;
	font-size: var(--font-small);
	font-weight: 500;
	color: var(--color-dark-gray);
	margin-bottom: var(--space-xsmall);
`;

interface InputProps {
	$hasError?: boolean;
}

export const Input = styled.input<InputProps>`
	width: 100%;
	padding: var(--space-small) var(--space-small);
	border: 1px solid
		${(props) => (props.$hasError ? 'var(--color-coral-dark)' : 'var(--color-light-gray)')};
	border-radius: var(--small-border-radius);
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: var(--color-blue);
		box-shadow: var(--box-shadow-small);
	}
`;

export const ErrorMessage = styled.p`
	position: absolute;
	margin-top: var(--space-xsmall);
	font-size: var(--font-small);
	color: var(--color-coral-dark);
`;

export const SubmitButton = styled.button`
	width: 100%;
	padding: var(--space-small) var(--space-medium);
	background-color: var(--color-skyblue-light-dark);
	color: var(--color-white);
	border: none;
	border-radius: var(--small-border-radius);
	font-size: var(--font-small);
	font-weight: 500;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-blue);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const Logo = styled.div`
	margin-bottom: var(--space-large);

	img {
		width: 150px;
		height: auto;
	}
`;

export const WelcomeText = styled.div`
	text-align: center;
	margin-bottom: var(--space-large);

	h1 {
		font-size: var(--font-xlarge);
		font-weight: bold;
		margin-bottom: var(--space-medium);
	}

	p {
		font-size: var(--font-medium);
		opacity: 0.9;
	}
`;
