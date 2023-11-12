import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './main.css';
import Navbar from '@components/Navbar.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Navbar />
		<ToastContainer />
		<RouterProvider router={router} />
	</React.StrictMode>
);
