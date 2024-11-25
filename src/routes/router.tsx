import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import {
	Home,
	Login,
	Register,
	Profile,
	SalaryDetails,
	CorrectionRequest,
	Calendar,
	NotFound,
} from '../pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFound />,
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
