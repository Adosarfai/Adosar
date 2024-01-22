import MainService from '@services/MainService.ts';
import MapService from '@services/MapService.ts';
import { signal } from '@preact/signals-react';
import StatisticsBar from '@components/app/StatisticsBar.tsx';
import MapCard from '@components/MapCard.tsx';
import Loading from '@components/Loading.tsx';
import { Map } from '@classes/map';

const statistics = signal<getStatisticsResponse>({
	mapCount: 0,
	leaderboardCount: 0,
	scoreCount: 0,
});

const map = signal<Map | undefined>(undefined);

export default function App() {
	MainService.getStatistics().then(data => (statistics.value = data));
	MapService.getMostPopularMap().then(data => (map.value = data));

	return (
		<div className='m-16'>
			<div className='w-fit mx-auto text-center'>
				<h2 className='text-4xl text-shadow-lg'>Welcome to</h2>
				<h1 className='text-8xl text-primary font-bold text-shadow-2xl'>Adosar</h1>
			</div>
			<StatisticsBar statistics={statistics.value} />

			<div className='flex-1 justify-center w-full mt-16'>
				<h1 className='font-bold text-3xl mx-auto w-fit'>Most popular map today</h1>
				{map.value ? (
					<MapCard
						innerClassName='rounded-2xl bg-gray-800 p-6 my-6 flex-1 sm:flex mx-auto w-1/3'
						key={1}
						mapId={map.value.mapId}
						title={map.value.title}
						mapper={map.value.user.username}
						userId={map.value.user.userId}
					/>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}
