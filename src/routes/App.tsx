import MainService from '@services/MainService.ts';
import { signal } from '@preact/signals-react';
import StatisticsBar from '@components/app/StatisticsBar.tsx';

const statistics = signal<getStatisticsResponse>({
	mapCount: 0,
	leaderboardCount: 0,
	scoreCount: 0,
});

export default function App() {
	MainService.getStatistics().then(data => (statistics.value = data));

	return (
		<>
			<div className='m-16'>
				<div className='w-fit mx-auto text-center'>
					<h2 className='text-4xl text-shadow-lg'>Welcome to</h2>
					<h1 className='text-8xl text-primary font-bold text-shadow-2xl'>Adosar</h1>
				</div>
				<StatisticsBar statistics={statistics.value} />
			</div>
		</>
	);
}
