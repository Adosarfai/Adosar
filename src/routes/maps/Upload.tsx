import { FormEvent, Reducer, useReducer } from 'react';
import MapService from '@services/MapService.ts';
import { toast } from 'react-toastify';

export default function Upload() {
	const [createNewMapRequest, updateNewCreateMapRequest] = useReducer<
		Reducer<createNewMapRequest, Partial<createNewMapRequest>>
	>(
		(prev: createNewMapRequest, next: Partial<createNewMapRequest>) => ({
			...prev,
			...next,
		}),
		{ title: '', artist: '', published: false }
	);
	const [uploadMapRequest, updateUploadMapRequest] = useReducer<
		Reducer<uploadMapRequest, Partial<uploadMapRequest>>
	>(
		(prev: uploadMapRequest, next: Partial<uploadMapRequest>) => ({
			...prev,
			...next,
		}),
		{ file: File.prototype, mapId: -1 }
	);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		MapService.createNewMap(createNewMapRequest).then(data => {
			updateUploadMapRequest({ mapId: data.mapId });
			MapService.uploadMap(uploadMapRequest).then(() => {
				toast.info('Map uploaded');
				window.location.pathname = `/map/${data.mapId}`;
			});
		});
		e.preventDefault();
	}

	return (
		<div className='m-16 flex gap-4'>
			<div className='grid grid-rows-2 gap-2 m-auto'>
				<form className='grid' onSubmit={onSubmit}>
					<div className='w-fit mx-auto my-16 text-center'>
						<h1 className='text-5xl text-primary font-bold text-shadow-2xl'>Upload</h1>
					</div>
					<label>Title</label>
					<input
						type='text'
						className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
						onChange={e =>
							updateNewCreateMapRequest({
								title: e.target.value,
							})
						}
					/>

					<label>Artist</label>
					<input
						type='text'
						className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
						onChange={e =>
							updateNewCreateMapRequest({
								artist: e.target.value,
							})
						}
					/>

					<label>Published</label>
					<input
						type='button'
						className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
						onClick={() =>
							updateNewCreateMapRequest({
								published: !createNewMapRequest.published,
							})
						}
						value={createNewMapRequest.published ? 'public' : 'private'}
					/>

					<label>File</label>
					<input
						type='file'
						accept='zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed'
						className='bg-charcoal border-2 rounded-lg py-1 px-2 hover:animate-pulse focus:animate-none'
						onChange={e =>
							updateUploadMapRequest({
								file: e.target.files?.item(0) ?? File.prototype,
							})
						}
					/>

					<input
						type='submit'
						value='Upload'
						className='ring-2 ring-primary w-full mx-auto rounded-lg py-2 px-8 mt-4 cursor-pointer hover:bg-primary smooth duration-150'
					/>
				</form>
			</div>
		</div>
	);
}
