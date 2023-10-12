import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs';
import { FormEvent, useReducer } from 'react';
import axios, { AxiosError } from 'axios';

interface FormData {
	email: string;
	password: string;
}

export default function Login() {
	const [formData, updateFormData] = useReducer(
		(prev: FormData, next: Partial<FormData>) => {
			return { ...prev, ...next };
		},
		{ email: '', password: '' }
	);

	function onLoginEmail(e: FormEvent<HTMLFormElement>) {
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, formData, {
				withCredentials: true,
			})
			.then(() => (window.location.pathname = '/'))
			.catch((err: AxiosError) => {
				if (err.response === undefined) {
					alert(err);
				} else if (err.response.status === 401) {
					alert('Invalid credentials');
				}
			});
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
				</div>
			</div>
		</>
	);
}
