import { AuthFormFields, FormErrors, User } from './auth';

export type LoginFormData = AuthFormFields;
export type LoginFormErrors = FormErrors<LoginFormData>;

export interface LoginProps {
	user: User | null;
	isLoading: boolean;
	errors: LoginFormErrors;
}
