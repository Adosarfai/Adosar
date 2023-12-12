import { FiExternalLink } from 'react-icons/fi';

interface Props {
	userId: number;
	username: string;
	creationDate: string;
	description: string;
	innerClassName?: string;
}

export default function UserCard(props: Props) {
	return (
		<div
			className={
				props.innerClassName
					? props.innerClassName
					: 'rounded-2xl bg-gray-800 p-6 my-6 flex-1 sm:flex sm:max-w-[33%]'
			}>
			<img
				src={`${import.meta.env.VITE_CDN_URL}/user/${props.userId}.png`}
				alt='pfp'
				className='h-fit w-32 rounded-full mr-8 shadow-2xl'
			/>
			<div className='relative w-full'>
				<div className='text-sm sm:text-2xl flex justify-between'>
					<h1 className='font-bold mx-auto mt-2 sm:mx-0 sm:mt-0 pb-1'>
						{props.username}
					</h1>
					<p className='font-light text-sm hidden sm:block'>
						{new Date(props.creationDate).toDateString()}
					</p>
				</div>
				<hr />
				<p className='font-light text-gray-300 text-xl hidden sm:block'>
					{props.description}
				</p>
				<div className='sm:absolute bottom-0 right-0 flex gap-4 justify-evenly mt-2'>
					<a
						className='hover:opacity-30 smooth duration-100'
						href={`/user/${props.userId}`}
						target='_blank'>
						<FiExternalLink />
					</a>
				</div>
			</div>
		</div>
	);
}
