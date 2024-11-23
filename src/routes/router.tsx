import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Profile from '@/pages/Profile/Profile';
import SalaryDetails from '@/pages/SalaryDetails/SalaryDetails';
import CorrectionRequest from '@/pages/CorrectionRequest/CorrectionRequest';
import Calendar from '@/pages/Calendar/Calendar';
import Layout from '@/layout/Layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{ path: '/profile', element: <Profile /> },
			{ path: '/salary-details', element: <SalaryDetails /> },
			{ path: '/correction-request', element: <CorrectionRequest /> },
			{ path: '/calendar', element: <Calendar /> },
		],
	},
]);
