import AnimatedNumber from 'react-animated-numbers';
import MainService from '@services/MainService.ts';

export default function App() {
	const { data: statistics } = MainService.getStatistics() || {};

	return (
		<>
			<div className='m-16'>
				<div className='w-fit mx-auto text-center'>
					<h2 className='text-4xl text-shadow-lg'>Welcome to</h2>
					<h1 className='text-8xl text-primary font-bold text-shadow-2xl'>
						Adosar
					</h1>
				</div>
				<div className='rounded-lg bg-gray-800 mt-32 flex text-center gap-4 py-8 px-2'>
					<section className='w-full'>
						<h3 className='font-light'>Maps uploaded</h3>
						<div className='text-secondary text-5xl font-semibold w-fit mx-auto'>
							<AnimatedNumber
								animateToNumber={statistics?.mapCount || 0}
								locale='en-US'
								configs={(_number, index) => ({
									mass: 1,
									tension: 220 * (index + 1),
									friction: 100,
								})}
							/>
						</div>
					</section>
					<section className='w-full'>
						<h3 className='font-light'>Scores set</h3>
						<div className='text-secondary text-5xl font-semibold w-fit mx-auto'>
							<AnimatedNumber
								animateToNumber={statistics?.scoreCount || 0}
								locale='en-US'
								configs={(_number, index) => ({
									mass: 1,
									tension: 220 * (index + 1),
									friction: 100,
								})}
							/>
						</div>
					</section>
					<section className='w-full'>
						<h3 className='font-light'>Active Leaderboards</h3>
						<div className='text-secondary text-5xl font-semibold w-fit mx-auto'>
							<AnimatedNumber
								animateToNumber={
									statistics?.leaderboardCount || 0
								}
								locale='en-US'
								configs={(_number, index) => ({
									mass: 1,
									tension: 220 * (index + 1),
									friction: 100,
								})}
							/>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
