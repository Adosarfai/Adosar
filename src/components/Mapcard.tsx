import { FiExternalLink } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';

interface Props {
	userId: number;
	mapId: number;
	title: string;
	mapper: string;
}

export default function Mapcard(props: Props) {
	return (
		<div className='rounded-2xl bg-gray-800 p-6 my-6 flex-1 sm:flex sm:max-w-[33%]'>
			<img
				src={`${import.meta.env.VITE_CDN_URL}/cover/${
					props.userId
				}.png`}
				alt='pfp'
				className='h-fit w-32 rounded-full mr-8'
			/>
			<div className='relative'>
				<div className='text-sm sm:text-2xl'>
					<h1 className='font-bold'>{props.title}</h1>
					<p className='font-light text-gray-300 sm:text-xl'>
						by {props.mapper}
					</p>
				</div>
				<div className='sm:absolute bottom-0 right-0 flex gap-4 justify-evenly mt-2'>
					<a
						className='hover:opacity-30 smooth duration-100'
						href={`/map/${props.mapId}`}
						target='_blank'>
						<FiExternalLink />
					</a>
					<a
						className='hover:opacity-30 smooth duration-100'
						href={`${import.meta.env.VITE_CDN_URL}/map/${
							props.mapId
						}.zip`}
						target='_blank'>
						<IoMdDownload />
					</a>
				</div>
			</div>
		</div>
	);
}
