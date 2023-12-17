import RequestService from './RequestService.ts';
import { User } from '@classes/user';

export default class UserService {
	static getAllUsers(page: number) {
		return RequestService.get<User[]>(`/user/all/${page}`, false);
	}

	static getAllUsersWithPartialData(page: number, username?: string, creationDate?: string) {
		let query = '';
		if (username) query += `username=${username}&`;
		if (creationDate) query += `creationdate=${creationDate}&`;
		return RequestService.get<User[]>(`/user/query/${page}?${query}`, false);
	}

	static getUserById(id: number) {
		return RequestService.get<User>(`/user/${id}`, false);
	}

	static createNewUser(user: createNewUserRequest) {
		return RequestService.post<void>('/user', user, false);
	}

	static loginUser(login: loginUserRequest) {
		return RequestService.post<void>('/user/login', login, true);
	}

	static removeUser(id: number) {
		return RequestService.delete<void>(`/user/${id}`, true);
	}

	static activateUser(id: number) {
		return RequestService.patch<void>(`/user/${id}`, {}, true);
	}

	static patchUserWithPartialData(request: patchUserWithPartialDataRequest) {
		return RequestService.patch<void>('/user/update', request, true);
	}
}
