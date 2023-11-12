import RequestService from './RequestService.ts';
import { User } from '@classes/user';

export default class UserService {
	static async getAllUsers(page: number) {
		return await RequestService.get<User[]>(`/all/${page}`, false);
	}

	static async getUserById(id: number) {
		return await RequestService.get<User>(`/${id}`, false);
	}

	static async createNewUser(user: createNewUserRequest) {
		return await RequestService.post<void>('/', user, false);
	}

	static async loginUser(login: loginUserRequest) {
		return await RequestService.post<void>('/login', login, true);
	}

	static async removeUser(id: number) {
		return await RequestService.delete<void>(`/${id}`, true);
	}

	static async activateUser(id: number) {
		return await RequestService.patch<void>(`/${id}`, {}, true);
	}
}
