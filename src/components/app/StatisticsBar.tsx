import AnimatedNumber from 'react-animated-numbers';

interface StatisticsBarProps {
	statistics: {
		mapCount: number;
		scoreCount: number;
		leaderboardCount: number;
	};
}

export default function StatisticsBar(props: StatisticsBarProps) {
	return (
		<div className='rounded-lg bg-gray-800 mt-32 flex text-center gap-4 py-8 px-2'>
			<section className='w-full'>
				<h3 className='font-light'>Maps uploaded</h3>
				<div className='text-secondary text-5xl font-semibold w-fit mx-auto'>
					<AnimatedNumber
						animateToNumber={props.statistics.mapCount}
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
						animateToNumber={props.statistics.scoreCount}
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
						animateToNumber={props.statistics.leaderboardCount}
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
	);
}
