/* eslint react-hooks/rules-of-hooks: 0 */ // --> OFF
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useSWR, { SWRResponse } from 'swr';

export default class RequestService {
	static async postAsync<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			return await this.postFetcher(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				data,
				withCredentials
			);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static post<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): SWRResponse<T, AxiosError<any, any>, any> {
		const res = useSWR<T, AxiosError<any, any>>(
			`${import.meta.env.VITE_BACKEND_URL}${url}`,
			(_url: string) => this.postFetcher(_url, data, withCredentials)
		);

		if (res.error) {
			toast.error('Failed to complete request');
			console.error(res.error);
		}

		return res;
	}

	static async getAsync<T = Requestable>(
		url: string,
		withCredentials: boolean
	): Promise<T> {
		try {
			return await this.getFetcher(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				withCredentials
			);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static get<T = Requestable>(
		url: string,
		withCredentials: boolean
	): SWRResponse<T, AxiosError<any, any>, any> {
		return useSWR<T, AxiosError<any, any>>(
			`${import.meta.env.VITE_BACKEND_URL}${url}`,
			(_url: string) => this.getFetcher(_url, withCredentials)
		);
	}

	static async deleteAsync<T = Requestable>(
		url: string,
		withCredentials: boolean
	): Promise<T> {
		try {
			return await this.deleteFetcher(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				withCredentials
			);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static delete<T = Requestable>(
		url: string,
		withCredentials: boolean
	): SWRResponse<T, AxiosError<any, any>, any> {
		const res = useSWR<T, AxiosError<any, any>>(
			`${import.meta.env.VITE_BACKEND_URL}${url}`,
			(_url: string) => this.deleteFetcher(_url, withCredentials)
		);

		if (res.error) {
			toast.error('Failed to complete request');
			console.error(res.error);
		}

		return res;
	}

	static async patchAsync<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): Promise<T> {
		try {
			return await this.patchFetcher(
				`${import.meta.env.VITE_BACKEND_URL}${url}`,
				data,
				withCredentials
			);
		} catch (e) {
			toast.error('Failed to complete request');
			console.error(e);
			return Promise.reject(e);
		}
	}

	static patch<T = Requestable>(
		url: string,
		data: any,
		withCredentials: boolean
	): SWRResponse<T, AxiosError<any, any>, any> {
		const res = useSWR<T, AxiosError<any, any>>(
			`${import.meta.env.VITE_BACKEND_URL}${url}`,
			(_url: string) => this.patchFetcher(_url, data, withCredentials)
		);

		if (res.error) {
			toast.error('Failed to complete request');
			console.error(res.error);
		}

		return res;
	}

	private static getFetcher = (url: string, withCredentials: boolean) =>
		axios
			.get(url, {
				withCredentials,
			})
			.then(res => res.data);

	private static postFetcher = (
		url: string,
		data: any,
		withCredentials: boolean
	) =>
		axios
			.post(url, data, {
				withCredentials,
			})
			.then(res => res.data);

	private static deleteFetcher = (url: string, withCredentials: boolean) =>
		axios
			.delete(url, {
				withCredentials,
			})
			.then(res => res.data);

	private static patchFetcher = (
		url: string,
		data: any,
		withCredentials: boolean
	) =>
		axios
			.patch(url, data, {
				withCredentials,
			})
			.then(res => res.data);
}
