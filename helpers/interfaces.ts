// Interface for form data
interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

// Interface for form errors
interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}

interface LoginFormData {
	email?: string;
	password?: string;
}

interface LoginFormErrors {
	email?: string;
	password?: string;
}

export { FormData, FormErrors, LoginFormData, LoginFormErrors };
