import List from '@components/List.tsx';

export default function App() {
	return (
		<>
			<div className='grid grid-cols-5 grid-flow-row gap-16 m-16'>
				<section className='bg-gray-800 rounded-lg p-8 divide-y-2 divide-orange-400 divide-opacity-50'>
					<h1 className='font-bold text-center pb-2'>
						Recently ranked
					</h1>
					<List scores={[]} />
				</section>
			</div>
		</>
	);
}
