﻿import UserService from '@services/UserService.ts';
import Loading from '@components/Loading.tsx';
import { User } from '@classes/user.ts';
import UserCard from '@components/UserCard.tsx';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { signal } from '@preact/signals-react';

const users = signal<User[] | undefined>(undefined);
const page = signal<number>(0);
const usernameQuery = signal<string>('');

export default function Users() {
	const [usernameQueryBounce] = useDebounce<string>(usernameQuery.value, 250);

	UserService.getAllUsersWithPartialData(page.value, usernameQueryBounce)
		.then(res => (users.value = res))
		.catch(() => {
			toast.error(`Could not load users`);
			return (
				<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
					<h1 className='mx-auto'>‼️Users could not be loaded‼️</h1>
				</div>
			);
		});

	return (
		<div className='m-16 flex gap-4'>
			<div className='bg-gray-800 rounded-lg p-4 min-w-[70%]'>
				Users
				<hr />
				<div className='m-4'>
					{!users.value ? (
						<Loading />
					) : (
						users.value.map((user: User, i: number) => {
							return (
								<UserCard
									key={i}
									userId={user.userId}
									username={user.username}
									creationDate={user.creationDate}
									description={user.description}
									innerClassName='rounded-2xl bg-gray-700 p-6 my-6 flex-1 sm:flex sm:max-w-full'
								/>
							);
						})
					)}
				</div>
			</div>
			<div className='bg-gray-800 rounded-lg p-4 w-full'>
				Filters
				<hr />
				<input
					className='my-2 rounded-lg px-2 py-1 bg-gray-700'
					type='text'
					onChange={e => (usernameQuery.value = e.currentTarget.value)}
					placeholder='Search'
				/>
				<div className='flex gap-4 justify-center mt-4'>
					<button onClick={() => (page.value -= page.value < 1 ? 0 : 1)}>&lt;</button>
					<p>{page.value}</p>
					<button onClick={() => (page.value += 1)}>&gt;</button>
				</div>
			</div>
		</div>
	);
}
