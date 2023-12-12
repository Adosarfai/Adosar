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

export default function UserInfo() {
	const { id } = useParams();

	if (!id) {
		toast.error('No user ID specified in url');
		Navigate({ to: '/' });
	}

	const { data: userData, error: errorUserData } = UserService.getUserById(
		Number(id)
	);
	const { data: maps, error: errorMaps } = MapService.getMapsByUser(
		Number(id)
	);
	const error = errorUserData || errorMaps;

	if (error) {
		toast.error(`Could not find user with id ${id}`);
		return (
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
				<h1 className='mx-auto'>‼️User could not be loaded‼️</h1>
			</div>
		);
	}

	return (
		<div className='h-screen absolute w-full'>
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex-1 sm:flex'>
				{!userData ? (
					<Loading />
				) : (
					<>
						<img
							src={`${import.meta.env.VITE_CDN_URL}/user/${
								userData.userId
							}.png`}
							alt='pfp'
							className='h-fit w-32 rounded-full mr-8 shadow-2xl'
						/>
						<span className='w-full'>
							<div className='mb-1 flex justify-between text-sm sm:text-2xl'>
								<h1 className='font-bold mx-auto mt-2 sm:mx-0 sm:mt-0'>
									{userData.username}
								</h1>
								<p className='font-light text-sm hidden sm:block'>
									{new Date(
										userData.creationDate
									).toDateString()}
								</p>
							</div>
							<hr />
							<p className='font-light text-gray-300 text-xl hidden sm:block'>
								{userData.description}
							</p>
							<div className='w-full h-12 bg-gray-700 rounded-xl my-2 p-2 gap-2 hidden sm:flex'>
								{userData.badges.length === 0 ? (
									<p className='text-gray-400'>
										User has no badges
									</p>
								) : (
									userData.badges.map(
										(badge: Badge, i: number) => (
											<img
												key={i}
												className='h-full rounded-full'
												src={`${
													import.meta.env.VITE_CDN_URL
												}/badge/${badge.badgeId}.png`}
												alt={badge.badgeId.toString()}
												title={badge.name}
											/>
										)
									)
								)}
							</div>
						</span>
						{JwtService.parseJwt(Cookies.get('jwt') || '')
							.userId === Number(id) ? (
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
				{!maps || !userData ? (
					<Loading />
				) : (
					maps.map((map: Map, i: number) => {
						return (
							<MapCard
								key={i}
								userId={userData.userId}
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
