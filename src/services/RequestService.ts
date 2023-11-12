import axios from 'axios';
import { toast } from 'react-toastify';

export default class RequestService {
	static async post<T = any>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				data,
				{
					withCredentials,
				}
			);
			return res.data;
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async get<T = any>(
		url: string,
		withCredentials: boolean
	): Promise<T> {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				{
					withCredentials,
				}
			);
			return res.data;
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async delete<T = any>(
		url: string,
		withCredentials: boolean
	): Promise<T> {
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				{
					withCredentials,
				}
			);
			return res.data;
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static async patch<T = any>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			const res = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				data,
				{
					withCredentials,
				}
			);
			return res.data;
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}
}
