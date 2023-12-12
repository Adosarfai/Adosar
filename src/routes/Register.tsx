import { FormEvent, Reducer, useReducer } from 'react';
import UserService from '@services/UserService.ts';

export default function Register() {
	const [formData, updateFormData] = useReducer<
		Reducer<createNewUserRequest, Partial<createNewUserRequest>>
	>(
		(prev: createNewUserRequest, next: Partial<createNewUserRequest>) => ({
			...prev,
			...next,
		}),
		{ email: '', username: '', password: '' }
	);

	function onRegister(e: FormEvent<HTMLFormElement>) {
		UserService.createNewUser(formData).then(
			() => (window.location.pathname = '/login')
		);
		e.preventDefault();
	}

	return (
		<>
			<div className='h-screen w-screen flex overflow-hidden'>
				<div className='grid grid-rows-2 gap-2 m-auto'>
					<form className='grid' onSubmit={onRegister}>
						<div className='w-fit mx-auto my-16 text-center'>
							<h1 className='text-5xl text-primary font-bold text-shadow-2xl'>
								Register
							</h1>
						</div>
						<label>Email</label>
						<input
							type='email'
							className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e =>
								updateFormData({
									email: e.target.value,
								})
							}
						/>

						<label>Username</label>
						<input
							type='username'
							className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e =>
								updateFormData({
									username: e.target.value,
								})
							}
						/>

						<label>Password</label>
						<input
							type='password'
							className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
							onChange={e =>
								updateFormData({
									password: e.target.value,
								})
							}
						/>

						<input
							type='submit'
							value='Register'
							className='ring-2 ring-primary w-full mx-auto rounded-lg py-2 px-8 mt-4 cursor-pointer hover:bg-primary smooth duration-150'
						/>
					</form>
				</div>
			</div>
		</>
	);
}
