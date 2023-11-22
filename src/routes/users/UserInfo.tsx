﻿import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '@services/UserService.ts';
import Loading from '../../components/Loading.tsx';
import MapService from '@services/MapService.ts';
import { IoMdDownload } from 'react-icons/io';
import { FiExternalLink } from 'react-icons/fi';

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
									userData.badges.map((badge, i) => (
										<img
											key={i}
											className='h-full rounded-full'
											src={`${
												import.meta.env.VITE_CDN_URL
											}/badge/${badge.badgeId}.png`}
											alt={badge.badgeId.toString()}
											title={badge.name}
										/>
									))
								)}
							</div>
						</span>
					</>
				)}
			</div>
			<div className='mx-16 flex-1 sm:flex'>
				{!maps || !userData ? (
					<Loading />
				) : (
					maps.map((map, i) => {
						return (
							<div
								key={i + 1}
								className='rounded-2xl bg-gray-800 p-6 my-6 flex-1 sm:flex sm:max-w-[33%]'>
								<img
									src={`${
										import.meta.env.VITE_CDN_URL
									}/cover/${userData.userId}.png`}
									alt='pfp'
									className='h-fit w-32 rounded-full mr-8'
								/>
								<div className='relative'>
									<div className='text-sm sm:text-2xl'>
										<h1 className='font-bold'>
											{map.title}
										</h1>
										<p className='font-light text-gray-300 sm:text-xl'>
											by {map.artist}
										</p>
									</div>
									<div className='sm:absolute bottom-0 right-0 flex gap-4 justify-evenly mt-2'>
										<a
											className='hover:opacity-30 smooth duration-100'
											href={`/map/${map.mapId}`}
											target='_blank'>
											<FiExternalLink />
										</a>
										<a
											className='hover:opacity-30 smooth duration-100'
											href={`${
												import.meta.env.VITE_CDN_URL
											}/map/${map.mapId}.zip`}
											target='_blank'>
											<IoMdDownload />
										</a>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
