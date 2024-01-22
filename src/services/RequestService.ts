import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { toast } from 'react-toastify';

const axios = setupCache(Axios);

export default class RequestService {
	static async get<T = Requestable>(url: string, withCredentials: boolean) {
		try {
			return axios
				.get<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async put<T = Requestable>(url: string, data: any, withCredentials: boolean) {
		try {
			return axios
				.put<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, data, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async post<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			return axios
				.post<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, data, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async postMultipart<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			return axios
				.post<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, data, {
					withCredentials,
					headers: {
						'content-type': 'multipart/form-data',
					},
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async delete<T = Requestable>(url: string, withCredentials: boolean): Promise<T> {
		try {
			return axios
				.delete<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async patch<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			return axios
				.patch<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, data, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async head<T = Requestable>(url: string, withCredentials: boolean): Promise<T> {
		try {
			return axios
				.head<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async options<T = Requestable>(url: string, withCredentials: boolean): Promise<T> {
		try {
			return axios
				.options<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
					withCredentials,
				})
				.then(res => res.data);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}
}
