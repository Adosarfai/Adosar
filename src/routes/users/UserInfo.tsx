import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '@services/UserService.ts';
import Loading from '../../components/Loading.tsx';
import MapService from '@services/MapService.ts';
import { Badge } from '@classes/badge.ts';
import { Map } from '@classes/map.ts';
import MapCard from '@components/MapCard.tsx';
import { IoSettingsOutline } from 'react-icons/io5';
import { signal } from '@preact/signals-react';
import { User } from '@classes/user.ts';
import State from '@services/State.ts';
import { FiExternalLink } from 'react-icons/fi';
import { Privilege } from '@classes/privilege.ts';
import { FaBan } from 'react-icons/fa';

const user = signal<User | undefined>(undefined);
const maps = signal<Map[] | undefined>(undefined);

export default function UserInfo() {
	const { id } = useParams();

	if (!id || !Number(id)) {
		toast.error('No user ID specified in url');
		Navigate({ to: '/' });
	}

	UserService.getUserById(Number(id))
		.then(res => (user.value = res))
		.catch(() => {
			toast.error(`Could not load user with ID`);
			return (
				<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
					<h1 className='mx-auto'>‼️User could not be loaded‼️</h1>
				</div>
			);
		});
	MapService.getMapsByUser(Number(id))
		.then(res => (maps.value = res))
		.catch(() => {
			toast.error(`Could not load maps by user with ID`);
			maps.value = [];
		});

	const handleBan = () => {
		if (user.value == null) return;

		const isBanned = user.value.privilege.toString() === Privilege[Privilege.BANNED];

		if (
			!window.confirm(
				`Are you sure you want to ${isBanned ? 'un' : ''}ban ${user.value?.username}?`
			)
		) {
			return;
		}

		UserService.removeUser(user.value?.userId).then(() => {
			toast.info(`${isBanned ? 'un' : ''}banned ${user.value?.username}`);
		});

		alert('banned');
	};

	return (
		<div className='h-screen absolute w-full'>
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex-1 sm:flex'>
				{!user.value ? (
					<Loading />
				) : (
					<>
						<img
							src={`${import.meta.env.VITE_CDN_URL}/user/${user.value.userId}.png`}
							alt='pfp'
							className='h-fit w-32 rounded-full mr-8 shadow-2xl'
						/>
						<span className='w-full relative'>
							<div className='mb-1 flex justify-between text-sm sm:text-2xl'>
								<h1 className='font-bold mx-auto mt-2 sm:mx-0 sm:mt-0 flex gap-2'>
									{user.value.username}
									<p className='text-red-500 font-bold text-sm'>
										{user.value.privilege.toString() ===
										Privilege[Privilege.BANNED]
											? 'BANNED'
											: ''}
									</p>
									<p className='text-red-500 font-bold text-sm'>
										{user.value.privilege.toString() ===
										Privilege[Privilege.REMOVED]
											? 'REMOVED'
											: ''}
									</p>
								</h1>
								<p className='font-light text-sm hidden sm:block'>
									{new Date(user.value.creationDate).toDateString()}
								</p>
							</div>
							<hr />
							<p className='font-light text-gray-300 text-xl hidden sm:block'>
								{user.value.description}
							</p>
							<div className='w-full h-12 bg-gray-700 rounded-xl my-2 p-2 gap-2 hidden sm:flex'>
								{user.value.badges.length === 0 ? (
									<p className='text-gray-400'>User has no badges</p>
								) : (
									user.value.badges.map((badge: Badge, i: number) => (
										<img
											key={i}
											className='h-full rounded-full'
											src={`${import.meta.env.VITE_CDN_URL}/badge/${
												badge.badgeId
											}.png`}
											alt={badge.badgeId.toString()}
											title={badge.name}
										/>
									))
								)}
							</div>
							<div className='flex gap-4 justify-end mt-2'>
								{State.privilege.value !== Privilege.ADMIN ? (
									<button
										className='hover:opacity-30 smooth duration-100'
										onClick={handleBan}>
										<FaBan />
									</button>
								) : undefined}
								<a
									className='hover:opacity-30 smooth duration-100'
									href={`/map/${id}`}
									target='_blank'>
									<FiExternalLink />
								</a>
							</div>
						</span>
						{State.userId.value === Number(id) ? (
							<div className='ml-2 mt-auto -mr-4 -mb-4'>
								<a href='/settings'>
									<IoSettingsOutline />
								</a>
							</div>
						) : (
							<></>
						)}
					</>
				)}
			</div>
			<div className='mx-16 flex-1 sm:flex'>
				{!(maps.value && user.value) ? (
					<Loading />
				) : (
					maps.value.map((map: Map, i: number) => {
						return (
							<MapCard
								key={i}
								userId={user.value?.userId ?? 0} // Cannot be undefined but webstorm still complains
								mapId={map.mapId}
								title={map.title}
								mapper={map.artist}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}
