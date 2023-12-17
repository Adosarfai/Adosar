import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs';
import { FormEvent, Reducer, useReducer } from 'react';
import UserService from '@services/UserService.ts';

export default function Login() {
	const [formData, updateFormData] = useReducer<
		Reducer<loginUserRequest, Partial<loginUserRequest>>
	>(
		(prev: loginUserRequest, next: Partial<loginUserRequest>) => ({
			...prev,
			...next,
		}),
		{ email: '', password: '' }
	);

	function onLoginEmail(e: FormEvent<HTMLFormElement>) {
		UserService.loginUser(formData).then(() => (window.location.pathname = '/'));
		e.preventDefault();
	}

	function onLoginGoogle() {
		// TODO: Login with google
		alert('not yet implemented');
	}

	function onLoginDiscord() {
		// TODO: Login with discord
		alert('not yet implemented');
	}

	function onLoginGithub() {
		// TODO: Login with github
		alert('not yet implemented');
	}

	return (
		<>
			<div className='h-screen w-screen flex'>
				<div className='grid grid-rows-2 gap-2 m-auto'>
					<button
						type='submit'
						disabled
						onClick={onLoginGoogle}
						className='ring-2 ring-secondary w-full mx-auto rounded-lg py-2 px-8 flex hover:bg-secondary smooth duration-150 cursor-pointer'>
						<span className='my-auto mr-4'>
							<BsGoogle />
						</span>
						Login with google
					</button>
					<button
						type='submit'
						disabled
						onClick={onLoginDiscord}
						className='ring-2 ring-secondary w-full mx-auto rounded-lg py-2 px-8 flex hover:bg-secondary smooth duration-150 cursor-pointer'>
						<span className='my-auto mr-4'>
							<BsDiscord />
						</span>
						Login with discord
					</button>
					<button
						type='submit'
						disabled
						onClick={onLoginGithub}
						className='ring-2 ring-secondary w-full mx-auto rounded-lg py-2 px-8 flex hover:bg-secondary smooth duration-150 cursor-pointer'>
						<span className='my-auto mr-4'>
							<BsGithub />
						</span>
						Login with github
					</button>

					<form className='grid' onSubmit={onLoginEmail}>
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
							value='Login'
							className='ring-2 ring-primary w-full mx-auto rounded-lg py-2 px-8 mt-4 cursor-pointer hover:bg-primary smooth duration-150'
						/>
					</form>
					<h1 className='font-thin'>
						No account yet?{' '}
						<a className='underline' href='/register'>
							register here
						</a>
					</h1>
				</div>
			</div>
		</>
	);
}
