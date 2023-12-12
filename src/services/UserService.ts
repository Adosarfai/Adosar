import RequestService from './RequestService.ts';
import { User } from '@classes/user';

export default class UserService {
	static getAllUsers(page: number) {
		return RequestService.get<User[]>(`/user/all/${page}`, false);
	}

	static getAllUsersWithPartialData(
		page: number,
		username?: string,
		creationdate?: string
	) {
		let query = '';
		if (username) query += `username=${username}&`;
		if (creationdate) query += `creationdate=${creationdate}&`;
		return RequestService.get<User[]>(
			`/user/query/${page}?${query}`,
			false
		);
	}

	static getUserById(id: number) {
		return RequestService.get<User>(`/user/${id}`, false);
	}

	static async createNewUser(user: createNewUserRequest) {
		return RequestService.postAsync<void>('/user', user, false);
	}

	static async loginUser(login: loginUserRequest) {
		return RequestService.postAsync<void>('/user/login', login, true);
	}

	static removeUser(id: number) {
		return RequestService.delete<void>(`/user/${id}`, true);
	}

	static activateUser(id: number) {
		return RequestService.patch<void>(`/user/${id}`, {}, true);
	}

	static patchUserWithPartialData(request: patchUserWithPartialDataRequest) {
		return RequestService.patchAsync<void>('/user/update', request, true);
	}
}
