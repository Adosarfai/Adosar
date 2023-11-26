import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading.tsx';
import MapService from '@services/MapService.ts';
import ScoreService from '@services/ScoreService.ts';
import { Score } from '@classes/score.ts';
import Scorecard from '@components/Scorecard.tsx';

export default function MapInfo() {
	const { id } = useParams();

	if (!id) {
		toast.error('No map ID specified in url');
		Navigate({ to: '/' });
	}

	const { data: mapData, error: mapError } = MapService.getMapById(
		Number(id)
	);
	const { data: scoreData, error: scoreError } =
		ScoreService.getScoresByMapId(Number(id));

	const error = mapError || scoreError;

	if (error) {
		if (mapError) toast.error(`Could not find map with id ${id}`);
		if (scoreError)
			toast.error(`Could not load scores for map with id ${id}`);

		return (
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
				<h1 className='mx-auto'>‼️Map could not be loaded‼️</h1>
			</div>
		);
	}

	return (
		<div className='h-screen absolute w-full'>
			<div className='m-16 bg-gray-800 rounded-2xl p-8 flex-1 sm:flex'>
				{!mapData ? (
					<Loading />
				) : (
					<>
						<img
							src={`${import.meta.env.VITE_CDN_URL}/cover/${
								mapData.mapId
							}.png`}
							alt='map cover2'
							className='h-fit w-32 rounded-full mr-8 shadow-2xl'
						/>
						<span className='w-full'>
							<div className='mb-1 flex justify-between text-sm sm:text-2xl'>
								<h1 className='font-bold mx-auto mt-2 sm:mx-0 sm:mt-0'>
									{mapData.title}
								</h1>
								<p className='font-light text-sm hidden sm:block'>
									{new Date(
										mapData.creationDate
									).toDateString()}
								</p>
							</div>
							<hr />
							<p className='font-light text-gray-300 text-xl hidden sm:block'>
								{mapData.artist}
							</p>
						</span>
					</>
				)}
			</div>
			<div className='mx-16 my-2'>
				<h1 className='text-3xl font-bold m-4'>Scores</h1>
				<hr />
			</div>
			<div className='mx-16 flex-1 sm:flex'>
				{!scoreData ? (
					<Loading />
				) : (
					scoreData.map((score: Score, i: number) => {
						return (
							<Scorecard
								key={i}
								userId={score.user.userId}
								replayId={score.replay.replayId}
								points={score.points}
								speed={score.speed}
								username={score.user.username}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}
