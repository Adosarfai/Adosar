import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading.tsx';
import MapService from '@services/MapService.ts';
import ScoreService from '@services/ScoreService.ts';
import { Score } from '@classes/score.ts';
import { signal } from '@preact/signals-react';
import { Map } from '@classes/map.ts';
import { FiExternalLink } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';
import { FaList } from 'react-icons/fa6';
import { BsTwitch } from 'react-icons/bs';
import moment from 'moment';
import { IoReload } from 'react-icons/io5';

const map = signal<Map | undefined>(undefined);
const scores = signal<Score[] | undefined>(undefined);
const page = signal<number>(0);

export default function MapInfo() {
	const { id } = useParams();

	if (!id) {
		toast.error('No map ID specified in url');
		Navigate({ to: '/' });
	}

	MapService.getMapById(Number(id))
		.then(res => (map.value = res))
		.catch(() => {
			toast.error(`Could not find map with id ${id}`);
			return (
				<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
					<h1 className='mx-auto'>‼️Map could not be loaded‼️</h1>
				</div>
			);
		});

	ScoreService.getScoresByMapId(Number(id), page.value)
		.then(res => (scores.value = res))
		.catch(() => {
			toast.error(`Could not load scores for map with id ${id}`);
		});

	return (
		<div className='h-screen absolute w-full'>
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex-1 sm:flex'>
				{!map.value ? (
					<Loading />
				) : (
					<>
						<img
							src={`${import.meta.env.VITE_CDN_URL}/cover/${id}.png`}
							alt='map cover2'
							className='h-fit w-32 rounded-full mr-8 shadow-2xl'
						/>
						<span className='w-full relative'>
							<div className='mb-1 flex justify-between text-sm sm:text-2xl'>
								<h1 className='font-bold mx-auto mt-2 sm:mx-0 sm:mt-0'>
									{map.value.title}
								</h1>
								<p className='font-light text-sm hidden sm:block'>
									{new Date(map.value.creationDate).toDateString()}
								</p>
							</div>
							<hr />
							<p className='font-light text-gray-300 text-xl hidden sm:block'>
								{map.value.artist}
							</p>
							<div className='sm:absolute bottom-0 right-0 flex gap-4 justify-evenly mt-2'>
								<a
									className='hover:opacity-30 smooth duration-100'
									href={`/pack/new?maps=[${id}]`}
									target='_blank'>
									<FaList />
								</a>
								<div
									className='hover:opacity-30 smooth duration-100 cursor-pointer'
									onClick={() => {
										alert(id);
									}}>
									<BsTwitch />
								</div>
								<a
									className='hover:opacity-30 smooth duration-100'
									href={`${import.meta.env.VITE_CDN_URL}/map/${id}.zip`}
									target='_blank'>
									<IoMdDownload />
								</a>
								<a
									className='hover:opacity-30 smooth duration-100'
									href={`/map/${id}`}
									target='_blank'>
									<FiExternalLink />
								</a>
							</div>
						</span>
					</>
				)}
			</div>
			<div className='mx-16 flex-1 sm:flex'>
				{!scores.value ? (
					<Loading />
				) : (
					<div className='bg-gray-800 rounded-2xl p-8 w-full'>
						<div className='flex-1'>
							{scores.value.map((score: Score, i: number) => {
								return (
									<div className='w-full border-b-2 flex justify-between' key={i}>
										<div className='flex gap-2'>
											<img
												src={`${import.meta.env.VITE_CDN_URL}/user/${
													score.user.userId
												}.png`}
												alt='map cover2'
												className='h-fit w-8 rounded-full shadow-2xl my-2'
											/>
											<h1 className='h-fit my-auto italic'>
												{score.user.username}
											</h1>
										</div>
										<div className='flex gap-4'>
											<p className='h-fit my-auto'>
												{moment(score.timeSet).fromNow()}
											</p>
											<a
												href={`${import.meta.env.VITE_REPLAY_URL}/${
													score.replay.replayId
												}`}
												className='-scale-x-100 my-auto h-fit'>
												<IoReload />
											</a>
											<p className='h-fit my-auto'>|</p>
											<p className='h-fit my-auto'>💥{score.points}</p>
										</div>
									</div>
								);
							})}
						</div>
						<div className='flex justify-center gap-4'>
							<h1
								className='cursor-pointer'
								onClick={() => {
									if (page.value > 0) page.value -= 1;
								}}>
								&lt;
							</h1>
							<p>{page.value}</p>
							<h1
								className='cursor-pointer'
								onClick={() => {
									// @ts-ignore
									if (scores.value.length / 10 + page.value * 10 === 1)
										page.value += 1; // A false positive by the IDE
								}}>
								&gt;
							</h1>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
