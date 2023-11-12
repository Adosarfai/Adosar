import { GoCircle } from 'react-icons/go';

export default function Loading() {
	return (
		<div className='w-full h-full'>
			<GoCircle className='animate-pulse w-16 h-16 mx-auto' />
		</div>
	);
}
