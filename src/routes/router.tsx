import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
	Home,
	Login,
	Register,
	Profile,
	SalaryManagement,
	SalaryDetails,
	ScheduleManagement,
	NotFound,
} from '../pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{
				path: '/profile',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '/salary-details', //사용자
				element: (
					<ProtectedRoute>
						<SalaryDetails />
					</ProtectedRoute>
				),
			},
			{
				path: '/schedule-management', //관리자
				element: (
					<ProtectedRoute>
						<ScheduleManagement />
					</ProtectedRoute>
				),
			},
			{
				path: '/salary-management',
				element: (
					<ProtectedRoute>
						<SalaryManagement />
					</ProtectedRoute>
				),
			},
		],
	},
]);
