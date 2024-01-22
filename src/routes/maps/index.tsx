import Loading from '@components/Loading.tsx';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { signal } from '@preact/signals-react';
import { Map } from '@classes/map.ts';
import MapService from '@services/MapService.ts';
import MapCard from '@components/MapCard.tsx';

const maps = signal<Map[] | undefined>(undefined);
const page = signal<number>(0);
const mapsQuery = signal<string>('');

export default function Maps() {
	const [mapsQueryBounce] = useDebounce<string>(mapsQuery.value, 250);

	MapService.getAllMapsWithPartialData(page.value, mapsQueryBounce)
		.then(res => (maps.value = res))
		.catch(() => {
			toast.error(`Could not load maps`);
			return (
				<div className='m-16 bg-gray-800 rounded-2xl p-8 flex'>
					<h1 className='mx-auto'>‼️Maps could not be loaded‼️</h1>
				</div>
			);
		});

	return (
		<div className='m-16 flex gap-4'>
			<div className='bg-gray-800 rounded-lg p-4 min-w-[70%]'>
				Maps
				<hr />
				<div className='m-4'>
					{!maps.value ? (
						<Loading />
					) : (
						maps.value.map((map: Map, i: number) => {
							return (
								<MapCard
									key={i}
									userId={map.user.userId}
									mapId={map.mapId}
									title={map.title}
									mapper={map.user.username}
									innerClassName='rounded-2xl bg-gray-700 p-6 my-6 flex-1 sm:flex sm:max-w-full'
								/>
							);
						})
					)}
				</div>
			</div>
			<div className='bg-gray-800 rounded-lg p-4 w-full flex-1'>
				Filters
				<hr />
				<input
					className='my-2 rounded-lg px-2 py-1 bg-gray-700 w-full'
					type='text'
					onChange={e => (mapsQuery.value = e.currentTarget.value)}
					placeholder='Search'
				/>
				<button
					onClick={() => (window.location.pathname = '/map/upload')}
					className='ring-2 ring-primary w-full mx-auto rounded-lg py-2 px-8 mt-4 cursor-pointer hover:bg-primary smooth duration-150'>
					Upload
				</button>
				<div className='flex gap-4 justify-center mt-4'>
					<button onClick={() => (page.value -= page.value < 1 ? 0 : 1)}>&lt;</button>
					<p>{page.value}</p>
					<button onClick={() => (page.value += 1)}>&gt;</button>
				</div>
			</div>
		</div>
	);
}
