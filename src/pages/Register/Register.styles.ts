import styled from 'styled-components';

export const RegisterContainer = styled.main`
	min-height: 100vh;
	display: flex;
	background-color: var(--color-pale-gray);
`;

export const LeftSection = styled.div`
	display: none;
	width: 40%;
	background-color: var(--color-blue);
	color: var(--color-white);
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--space-small);
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
	background-color: var(--color-pale-gray);

	@media (min-width: 1024px) {
		width: 60%;
		margin-left: auto;
	}
`;

export const FormContainer = styled.div`
	background-color: var(--color-white);
	padding: var(--space-xlarge) var(--space-large);
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-xlarge);
	width: 470px;
	min-width: 470px;
	max-width: 470px;

	@media (max-width: 520px) {
		width: 320px;
		min-width: 320px;
		max-width: 320px;
		padding: var(--space-large) var(--space-medium);
	}
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
	$validation?: 'default' | 'invalid';
}

export const Input = styled.input<InputProps>`
	width: 100%;
	padding: var(--space-small) var(--space-small);
	border: 1px solid
		${(props) =>
			props.$validation === 'invalid' ? 'var(--color-coral-dark)' : 'var(--color-light-gray)'};
	border-radius: var(--small-border-radius);
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: var(--color-blue);
		box-shadow: var(--box-shadow-small);
	}
`;

export const Select = styled.select<InputProps>`
	width: 100%;
	padding: var(--space-small) var(--space-small);
	border: 1px solid
		${(props) =>
			props.$validation === 'invalid' ? 'var(--color-coral-dark)' : 'var(--color-light-gray)'};
	border-radius: var(--small-border-radius);
	outline: none;
	transition: all 0.3s;

	&:focus {
		border-color: var(--color-blue);
		box-shadow: var(--box-shadow-small);
	}
`;

export const ErrorMessage = styled.p`
	color: var(--color-coral-dark);
	font-size: var(--font-small);
	margin-top: var(--space-small);
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
