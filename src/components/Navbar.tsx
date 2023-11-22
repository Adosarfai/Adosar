import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { Jwt } from '@classes/jwt.ts';

export default function Navbar() {
	const pages = [
		{ display: 'Home', page: '/' },
		{ display: 'Leaderboards', page: '/leaderboards' },
		{ display: 'Users', page: '/users' },
		{ display: 'Packs', page: '/packs' },
	];

	const currentPage = window.location.pathname;

	function parseJwt(token: string): Jwt {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split('')
				.map(function (c) {
					return (
						'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join('')
		);

		return JSON.parse(jsonPayload);
	}

	return (
		<Disclosure
			as='nav'
			className='w-full h-16 bg-gray-800 shadow-2xl smooth duration-100'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<img
										className='block h-8 w-auto lg:hidden'
										src='/logo1024.png'
										alt='logo'
									/>
									<img
										className='hidden h-8 w-auto lg:block'
										src='/logo1024.png'
										alt='logo'
									/>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{pages.map((item, index) => (
											<a
												key={index}
												href={item.page}
												className={`px-2 py-1 my-auto bg-white bg-opacity-0 hover:bg-opacity-10 hover:text-orange-400 rounded-lg smooth ${
													item.page == currentPage
														? 'font-bold'
														: 'font-extralight'
												}`}
												aria-current={
													item.page === currentPage
														? 'page'
														: undefined
												}>
												{item.display}
											</a>
										))}
									</div>
								</div>
								<div className='hidden sm:w-full sm:block'></div>
								<div className='hidden sm:ml-6 sm:block float-right flex-none'>
									{Cookies.get('jwt') ? (
										<a href='/login'>
											<img
												src={`${
													import.meta.env.VITE_CDN_URL
												}/user/${
													parseJwt(
														Cookies.get('jwt') || ''
													).userId
												}.png`}
												alt='PP'
												className='h-10 w-10 rounded-full'
											/>
										</a>
									) : (
										<a href='/login'>
											<img
												src='/person.svg'
												alt='PP'
												className='h-10 w-10 rounded-full'
											/>
										</a>
									)}
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2 bg-gray-800 z-10'>
							{pages.map((item, index) => (
								<Disclosure.Button
									key={index}
									as='a'
									href={item.page}
									className={`block cursor-pointer rounded-md px-3 py-2 text-base font-medium ${
										item.page === currentPage
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white'
									}`}
									aria-current={
										item.page === currentPage
											? 'page'
											: undefined
									}>
									{item.display}
								</Disclosure.Button>
							))}
							<Disclosure.Button
								key='login'
								as='a'
								href='/login'
								className={`block cursor-pointer rounded-md px-3 py-2 text-base font-medium ${
									'/login' === currentPage
										? 'bg-gray-900 text-white'
										: 'text-gray-300 hover:bg-gray-700 hover:text-white'
								}`}
								aria-current={
									window.location.pathname === '/login'
										? 'page'
										: undefined
								}>
								Login
							</Disclosure.Button>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
