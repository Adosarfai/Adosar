import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '@services/UserService.ts';
import Loading from '../../components/Loading.tsx';
import MapService from '@services/MapService.ts';
import { Badge } from '@classes/badge.ts';
import { Map } from '@classes/map.ts';
import MapCard from '@components/MapCard.tsx';
import { IoSettingsOutline } from 'react-icons/io5';
import JwtService from '@services/JwtService.ts';
import Cookies from 'js-cookie';
import { signal } from '@preact/signals-react';
import { User } from '@classes/user.ts';

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
						<span className='w-full'>
							<div className='mb-1 flex justify-between text-sm sm:text-2xl'>
								<h1 className='font-bold mx-auto mt-2 sm:mx-0 sm:mt-0'>
									{user.value.username}
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
						</span>
						{JwtService.parseJwt(Cookies.get('jwt') || '').userId === Number(id) ? (
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
								userId={user.value?.userId || 0} // Cannot be undefined but webstorm still complains
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
