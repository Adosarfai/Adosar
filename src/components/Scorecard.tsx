import { FiExternalLink } from 'react-icons/fi';

interface Props {
	userId: number;
	replayId: number;
	points: number;
	speed: number;
	username: string;
}

export default function Scorecard(props: Props) {
	return (
		<div className='rounded-2xl bg-gray-800 p-6 my-6 flex-1 sm:flex sm:max-w-[33%]'>
			<img
				src={`${import.meta.env.VITE_CDN_URL}/user/${props.userId}.png`}
				alt='pfp'
				className='h-fit w-32 rounded-full mr-8 shadow-2xl'
			/>
			<div className='relative'>
				<div className='text-sm sm:text-2xl'>
					<h1 className='font-bold'>{props.username}</h1>
					<p className='font-light text-gray-300 sm:text-xl'>
						{props.points} | {props.speed}x speed
					</p>
				</div>
				<div className='sm:absolute bottom-0 right-0 flex gap-4 justify-evenly mt-2'>
					<a
						className='hover:opacity-30 smooth duration-100'
						href={`${import.meta.env.VITE_REPLAY_URL}/${
							props.replayId
						}`}
						target='_blank'>
						<FiExternalLink />
					</a>
				</div>
			</div>
		</div>
	);
}
