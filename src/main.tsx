import ReactDOM from 'react-dom/client';
import App from '@routes/App.tsx';
import './main.css';
import Navbar from '@components/Navbar.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@routes/Login.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Users from '@routes/users';
import UserInfo from '@routes/users/UserInfo.tsx';
import MapInfo from '@routes/maps/MapInfo.tsx';
import Maps from '@routes/maps';
import Register from '@routes/Register.tsx';
import Settings from '@routes/Settings.tsx';
// @ts-expect-error Types library is outdated
import { Helmet } from 'react-helmet';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/users',
		element: <Users />,
	},
	{
		path: '/user',
		element: <UserInfo />,
	},
	{
		path: '/user/:id',
		element: <UserInfo />,
	},
	{
		path: '/maps',
		element: <Maps />,
	},
	{
		path: '/map',
		element: <MapInfo />,
	},
	{
		path: '/map/:id',
		element: <MapInfo />,
	},
	{
		path: '/settings',
		element: <Settings />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<Helmet>
			<link rel='apple-touch-icon' sizes='57x57' href='/favicon/apple-icon-57x57.png' />
			<link rel='apple-touch-icon' sizes='60x60' href='/favicon/apple-icon-60x60.png' />
			<link rel='apple-touch-icon' sizes='72x72' href='/favicon/apple-icon-72x72.png' />
			<link rel='apple-touch-icon' sizes='76x76' href='/favicon/apple-icon-76x76.png' />
			<link rel='apple-touch-icon' sizes='114x114' href='/favicon/apple-icon-114x114.png' />
			<link rel='apple-touch-icon' sizes='120x120' href='/favicon/apple-icon-120x120.png' />
			<link rel='apple-touch-icon' sizes='144x144' href='/favicon/apple-icon-144x144.png' />
			<link rel='apple-touch-icon' sizes='152x152' href='/favicon/apple-icon-152x152.png' />
			<link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-icon-180x180.png' />
			<link
				rel='icon'
				type='image/png'
				sizes='192x192'
				href='/favicon/android-icon-192x192.png'
			/>
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='96x96' href='/favicon/favicon-96x96.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
			<link rel='manifest' href='/favicon/manifest.json' />
			<meta name='msapplication-TileColor' content='#36454F' />
			<meta name='msapplication-TileImage' content='/favicon/ms-icon-144x144.png' />
			<meta name='theme-color' content='#36454F' />
		</Helmet>
		<Navbar />
		<ToastContainer />
		<RouterProvider router={router} />
	</>
);
