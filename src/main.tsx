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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<Navbar />
		<ToastContainer />
		<RouterProvider router={router} />
	</>
);
