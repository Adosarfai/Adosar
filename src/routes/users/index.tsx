import UserService from '@services/UserService.ts';
import { useState } from 'react';
import Loading from '@components/Loading.tsx';
import { User } from '@classes/user.ts';
import UserCard from '@components/UserCard.tsx';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

export default function Users() {
	const [page, setPage] = useState<number>(0);
	const [usernameQuery, setUsernameQuery] = useState<string>('');
	const [usernameQueryBounce] = useDebounce<string>(usernameQuery, 250);

	const { data: users, error } = UserService.getAllUsersWithPartialData(
		page,
		usernameQueryBounce
	);

	if (error) {
		toast.error(`Could not load users`);
		return (
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
				<h1 className='mx-auto'>‼️Users could not be loaded‼️</h1>
			</div>
		);
	}
	return (
		<div className='m-16 flex gap-4'>
			<div className='bg-gray-800 rounded-lg p-4 min-w-[70%]'>
				Users
				<hr />
				<div className='m-4'>
					{!users ? (
						<Loading />
					) : (
						users.map((user: User, i: number) => {
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
					onChange={e => setUsernameQuery(e.currentTarget.value)}
					placeholder='Search'
				/>
			</div>
			<button onClick={() => setPage(1)}>&gt;</button>
		</div>
	);
}
