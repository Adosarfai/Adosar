import { FormEvent, Reducer, useReducer } from 'react';
import { Navigate } from 'react-router-dom';
import Base64Service from '@services/Base64Service.ts';
import UserService from '@services/UserService.ts';
import State from '@services/State.ts';

export default function Settings() {
	const [formData, updateFormData] = useReducer<
		Reducer<patchUserWithPartialDataRequest, Partial<patchUserWithPartialDataRequest>>
	>(
		(
			prev: patchUserWithPartialDataRequest,
			next: Partial<patchUserWithPartialDataRequest>
		) => ({
			...prev,
			...next,
		}),
		{
			email: null,
			username: null,
			password: null,
			profilePicture: null,
		}
	);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		UserService.patchUserWithPartialData(formData).then(() =>
			Navigate({
				to: `/user/${State.userId.value}`,
			})
		);
	}

	return (
		<div className='h-screen flex'>
			<div className='m-16 mx-auto'>
				<div className='w-fit mx-auto mb-4 text-center'>
					<h1 className='text-5xl text-primary font-bold text-shadow-2xl'>Settings</h1>
				</div>
				<div className='bg-gray-800 rounded-lg'>
					<form className='p-8 grid' onSubmit={onSubmit}>
						<label>Username</label>
						<input
							type='username'
							className='bg-charcoal border-2 rounded-lg my-2 py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e =>
								updateFormData({
									username: e.target.value,
								})
							}
						/>

						<label>Email</label>
						<input
							type='email'
							className='bg-charcoal border-2 rounded-lg my-2 py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e =>
								updateFormData({
									email: e.target.value,
								})
							}
						/>

						<label>Password</label>
						<input
							type='password'
							className='bg-charcoal border-2 rounded-lg my-2 py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e =>
								updateFormData({
									password: e.target.value,
								})
							}
						/>

						<label>Profile picture</label>
						<img
							src={`${import.meta.env.VITE_CDN_URL}/user/${State.userId.value}.png`}
							alt='PP'
							className='h-16 w-16 m-2 rounded-full mx-auto'
						/>
						<input
							type='file'
							className='bg-charcoal border-2 rounded-lg my-2 py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e => {
								if (e.target.files![0]) {
									Base64Service.toBase64(e.target.files![0]).then(res => {
										updateFormData({
											profilePicture: res as string,
										});
									});
								}
							}}
						/>

						<input
							type='submit'
							value='Save'
							className='ring-2 ring-primary w-full mx-auto rounded-lg py-2 px-8 mt-4 cursor-pointer hover:bg-primary smooth duration-150'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
