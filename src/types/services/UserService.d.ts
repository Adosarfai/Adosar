declare class createNewUserRequest {
	email: string;
	username: string;
	password: string;
}

declare class loginUserRequest {
	email: string;
	password: string;
}

declare class patchUserWithPartialDataRequest {
	email: string | null;
	username: string | null;
	password: string | null;
	profilePicture: string | null;
}
