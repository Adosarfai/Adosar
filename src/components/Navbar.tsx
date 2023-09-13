export default function Navbar() {
	const pages = [
		{ display: 'Home', page: '/' },
		{ display: 'Leaderboards', page: '/leaderboards' },
		{ display: 'Users', page: '/users' },
		{ display: 'Packs', page: '/packs' },
	];

	return (
		<nav className='w-screen h-24 bg-gray-800 shadow-2xl'>
			<div className='flex gap-12'>
				<img
					src='logo128.png'
					alt='logo'
					width='96'
					height='96'
					className='mx-5'
				/>
				{pages.map((page, index) => {
					return (
						<a
							href={page.page}
							key={index}
							className={`px-4 py-2 my-auto bg-white bg-opacity-0 hover:bg-opacity-10 hover:text-orange-400 rounded-lg animate ${
								page.page == window.location.pathname
									? 'font-bold'
									: 'font-extralight'
							}`}>
							{page.display}
						</a>
					);
				})}
			</div>
		</nav>
	);
}
