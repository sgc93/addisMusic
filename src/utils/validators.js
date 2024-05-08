export const isEmailValid = (email) => {
	if (email) {
		return null;
	} else {
		return "Email is Required, enter valid email please!";
	}
};

export const isPasswordValid = (password) => {
	if (password.length < 6) {
		return "Password length must be >= 6";
	} else {
		return null;
	}
};
